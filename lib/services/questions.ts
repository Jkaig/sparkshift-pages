import { db } from './firebase';
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

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
  category: string,
  count: number = 10
): Promise<Question[]> => {
  // This would typically call an AI service (e.g., OpenAI API)
  // For now, we'll use mock data
  const mockQuestions: Partial<Question>[] = Array.from({ length: count }, (_, i) => ({
    state,
    category,
    subcategory: 'General',
    difficulty: 'intermediate',
    question: `Sample question ${i + 1} for ${state} ${category}`,
    options: [
      'Sample answer 1',
      'Sample answer 2',
      'Sample answer 3',
      'Sample answer 4'
    ],
    correctAnswer: Math.floor(Math.random() * 4),
    explanation: 'Detailed explanation of the correct answer',
    references: ['NEC 2020 Article XXX'],
  }));

  const questions: Question[] = [];
  
  for (const q of mockQuestions) {
    const docRef = await addDoc(collection(db, 'questions'), {
      ...q,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    questions.push({
      id: docRef.id,
      ...q as Question
    });
  }

  return questions;
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