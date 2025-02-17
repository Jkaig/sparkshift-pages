import { db } from './firebase';
import { collection, addDoc, query, where, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';
import OpenAI from 'openai';
import { getUserProfile } from './firebase';

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
  try {
    if (!userId) {
      throw new Error("User must be authenticated to generate questions");
    }

    // Check user's subscription status
    const userProfile = await getUserProfile(userId);
    if (!userProfile) {
      throw new Error("User profile not found");
    }

    // Verify subscription status
    const isSubscribed = userProfile.subscriptionStatus === 'active' || 
                        userProfile.subscriptionStatus === 'trial';
    const subscriptionTier = userProfile.subscriptionTier;

    if (!isSubscribed) {
      throw new Error("Active subscription required to generate questions");
    }

    // Calculate question count based on subscription tier and duration
    let questionCount = Math.floor(parseInt(duration) * 2); // 2 questions per minute base rate
    const maxQuestions = subscriptionTier === 'pro' ? 100 : 50;
    questionCount = Math.min(questionCount, maxQuestions);

    // Get user's previous performance
    let weakTopics: string[] = [];
    const topicMastery = await getTopicMastery(userId);
    weakTopics = topicMastery
      .filter(topic => topic.confidenceScore < 0.7)
      .map(topic => topic.topic);

    // Generate questions using OpenAI with enhanced prompting
    const prompt = `Generate ${questionCount} electrical exam questions for ${state} state electrical license exam. 
    ${weakTopics.length > 0 ? `Focus on these topics: ${weakTopics.join(', ')}. ` : ''}
    Include:
    - State-specific code requirements
    - Recent NEC updates
    - Real-world scenarios
    - Code compliance questions
    - Safety regulations
    
    Difficulty distribution:
    - 30% Beginner
    - 50% Intermediate
    - 20% Advanced
    
    Format as JSON array with properties:
    - question (clear, concise text)
    - options (array of 4 distinct choices)
    - correctAnswer (0-3)
    - explanation (detailed explanation with code references)
    - references (array of specific code sections)
    - category (main topic area)
    - subcategory (specific subtopic)
    - difficulty (beginner/intermediate/advanced)`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert electrical exam question generator with deep knowledge of electrical codes, standards, and best practices."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    const generatedQuestions = JSON.parse(completion.choices[0].message.content || '[]');

    // Store questions in Firestore with metadata
    const questions: Question[] = [];
    
    for (const q of generatedQuestions) {
      const docRef = await addDoc(collection(db, 'questions'), {
        ...q,
        state,
        createdAt: new Date(),
        updatedAt: new Date(),
        generatedFor: userId,
        subscriptionTier: subscriptionTier,
      });
      
      questions.push({
        id: docRef.id,
        ...q,
        state,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Update user's question generation count
    await updateUserQuestionCount(userId);

    return questions;
  } catch (error) {
    console.error('Error generating questions:', error);
    throw error;
  }
};

const updateUserQuestionCount = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  const userData = userDoc.data();

  await updateDoc(userRef, {
    questionsGenerated: (userData?.questionsGenerated || 0) + 1,
    lastQuestionGeneration: new Date(),
  });
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

  // Store the answer with detailed metadata
  await addDoc(collection(db, 'userAnswers'), {
    userId,
    questionId,
    selectedAnswer: answer,
    isCorrect,
    timeSpent,
    attemptedAt: new Date(),
    questionCategory: question.category,
    questionDifficulty: question.difficulty,
    state: question.state,
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
      difficulty: question.difficulty,
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