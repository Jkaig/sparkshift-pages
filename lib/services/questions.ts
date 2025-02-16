import { db } from './firebase';
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY
});

export interface Question {
  id: string;
  state: string;
  category: string;
  subcategory: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  references: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserAnswer {
  questionId: string;
  userId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
  attemptedAt: Date;
}

export interface TopicMastery {
  userId: string;
  topic: string;
  correctAnswers: number;
  totalAttempts: number;
  lastAttempted: Date;
  confidenceScore: number;
}

export const generateQuestions = async (
  state: string,
  duration: string,
  userId?: string
): Promise<Question[]> => {
  const questionCount = Math.floor(parseInt(duration) * 2); // 2 questions per minute
  
  try {
    // Get user's previous performance if available
    let weakTopics: string[] = [];
    if (userId) {
      const topicMastery = await getTopicMastery(userId);
      weakTopics = topicMastery
        .filter(topic => topic.confidenceScore < 0.7)
        .map(topic => topic.topic);
    }

    // Generate questions using OpenAI
    const prompt = `Generate ${questionCount} electrical exam questions for ${state} state electrical license exam. 
    ${weakTopics.length > 0 ? `Focus on these topics: ${weakTopics.join(', ')}. ` : ''}
    Include state-specific code requirements and recent NEC updates.
    Format as JSON array with properties: question, options (array of 4), correctAnswer (0-3), explanation, references.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert electrical exam question generator. Create challenging but fair questions that test real-world knowledge and code compliance."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    const generatedQuestions = JSON.parse(completion.choices[0].message.content || '[]');

    // Store questions in Firestore
    const questions: Question[] = [];
    
    for (const q of generatedQuestions) {
      const docRef = await addDoc(collection(db, 'questions'), {
        ...q,
        state,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      questions.push({
        id: docRef.id,
        ...q,
        state,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return questions;
  } catch (error) {
    console.error('Error generating questions:', error);
    throw error;
  }
};

export const submitAnswer = async (
  userId: string,
  questionId: string,
  answer: number,
  timeSpent: number
): Promise<void> => {
  const questionRef = doc(db, 'questions', questionId);
  const questionDoc = await getDocs(query(
    collection(db, 'questions'),
    where('id', '==', questionId)
  ));
  
  const question = questionDoc.docs[0].data() as Question;
  const isCorrect = answer === question.correctAnswer;

  await addDoc(collection(db, 'userAnswers'), {
    userId,
    questionId,
    selectedAnswer: answer,
    isCorrect,
    timeSpent,
    attemptedAt: new Date(),
  });

  // Update topic mastery
  const topicQuery = query(
    collection(db, 'topicMastery'),
    where('userId', '==', userId),
    where('topic', '==', question.category)
  );
  
  const topicDocs = await getDocs(topicQuery);
  
  if (topicDocs.empty) {
    await addDoc(collection(db, 'topicMastery'), {
      userId,
      topic: question.category,
      correctAnswers: isCorrect ? 1 : 0,
      totalAttempts: 1,
      lastAttempted: new Date(),
      confidenceScore: isCorrect ? 1 : 0,
    });
  } else {
    const topicDoc = topicDocs.docs[0];
    const topicData = topicDoc.data() as TopicMastery;
    
    await updateDoc(doc(db, 'topicMastery', topicDoc.id), {
      correctAnswers: topicData.correctAnswers + (isCorrect ? 1 : 0),
      totalAttempts: topicData.totalAttempts + 1,
      lastAttempted: new Date(),
      confidenceScore: (topicData.correctAnswers + (isCorrect ? 1 : 0)) / (topicData.totalAttempts + 1),
    });
  }
};

export const getTopicMastery = async (userId: string): Promise<TopicMastery[]> => {
  const topicQuery = query(
    collection(db, 'topicMastery'),
    where('userId', '==', userId)
  );
  
  const topicDocs = await getDocs(topicQuery);
  return topicDocs.docs.map(doc => doc.data() as TopicMastery);
};