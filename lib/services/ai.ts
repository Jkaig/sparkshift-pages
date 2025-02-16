import { db } from './firebase';
import { collection, query, where, getDocs, addDoc, updateDoc } from 'firebase/firestore';

export interface AIRecommendation {
  topics: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeAllocation: {
    [topic: string]: number;
  };
  suggestedResources: string[];
  confidenceScore: number;
}

export interface StudyPlan {
  userId: string;
  weeklyGoals: {
    [topic: string]: {
      questionsTarget: number;
      timeTarget: number;
    };
  };
  recommendedTopics: string[];
  estimatedReadiness: number;
  nextMilestones: string[];
}

export const generateAIRecommendations = async (
  userId: string,
  performanceData: any
): Promise<AIRecommendation> => {
  // This would typically call an AI service (e.g., OpenAI API)
  // For now, we'll use a simple algorithm
  
  const weakTopics = performanceData.topicBreakdown
    .filter((topic: any) => topic.score < 0.7)
    .map((topic: any) => topic.name);

  const timeAllocation = weakTopics.reduce((acc: any, topic: string) => {
    acc[topic] = 30; // 30 minutes per weak topic
    return acc;
  }, {});

  return {
    topics: weakTopics,
    difficulty: performanceData.overallScore < 0.6 ? 'beginner' : 'intermediate',
    timeAllocation,
    suggestedResources: [
      'Practice Tests',
      'Video Tutorials',
      'Code Reference Guides'
    ],
    confidenceScore: performanceData.overallScore
  };
};

export const createPersonalizedStudyPlan = async (
  userId: string,
  recommendations: AIRecommendation
): Promise<StudyPlan> => {
  const studyPlan: StudyPlan = {
    userId,
    weeklyGoals: {},
    recommendedTopics: recommendations.topics,
    estimatedReadiness: recommendations.confidenceScore * 100,
    nextMilestones: []
  };

  // Calculate weekly goals based on recommendations
  recommendations.topics.forEach(topic => {
    studyPlan.weeklyGoals[topic] = {
      questionsTarget: 50,
      timeTarget: recommendations.timeAllocation[topic]
    };
  });

  // Store study plan in Firestore
  await addDoc(collection(db, 'studyPlans'), studyPlan);

  return studyPlan;
};

export const updateStudyPlanProgress = async (
  userId: string,
  progress: {
    topic: string;
    questionsCompleted: number;
    timeSpent: number;
  }
) => {
  const studyPlansRef = collection(db, 'studyPlans');
  const q = query(studyPlansRef, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const studyPlanDoc = querySnapshot.docs[0];
    const studyPlan = studyPlanDoc.data() as StudyPlan;

    // Update progress
    if (studyPlan.weeklyGoals[progress.topic]) {
      const updatedGoals = {
        ...studyPlan.weeklyGoals,
        [progress.topic]: {
          ...studyPlan.weeklyGoals[progress.topic],
          questionsCompleted: progress.questionsCompleted,
          timeSpent: progress.timeSpent
        }
      };

      await updateDoc(studyPlanDoc.ref, {
        weeklyGoals: updatedGoals
      });
    }
  }
};