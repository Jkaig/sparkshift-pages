import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Question, submitAnswer } from '@/lib/services/questions';
import { useAuthContext } from '@/lib/providers/AuthProvider';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Ionicons } from '@expo/vector-icons';

export default function QuizScreen() {
  const { category, state } = useLocalSearchParams<{ category: string; state: string }>();
  const { user } = useAuthContext();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [startTime, setStartTime] = useState<Date>(new Date());

  useEffect(() => {
    // In a real app, fetch questions from the API
    const mockQuestions: Question[] = Array.from({ length: 10 }, (_, i) => ({
      id: `q${i}`,
      state: state || 'CA',
      category: category || 'Electrical Theory',
      subcategory: 'General',
      difficulty: 'intermediate',
      question: `Sample question ${i + 1} about ${category}?`,
      options: [
        'Sample answer 1',
        'Sample answer 2',
        'Sample answer 3',
        'Sample answer 4'
      ],
      correctAnswer: Math.floor(Math.random() * 4),
      explanation: 'Detailed explanation of why this answer is correct...',
      references: ['NEC 2020 Article XXX'],
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    
    setQuestions(mockQuestions);
  }, [category, state]);

  const handleAnswerSelect = async (index: number) => {
    setSelectedAnswer(index);
    const timeSpent = (new Date().getTime() - startTime.getTime()) / 1000;
    
    if (user) {
      await submitAnswer(user.uid, questions[currentIndex].id, index, timeSpent);
    }
    
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setStartTime(new Date());
    } else {
      router.push('/test-prep/results');
    }
  };

  if (!questions.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading questions...</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.progress}>
          Question {currentIndex + 1} of {questions.length}
        </Text>
        <Text style={styles.category}>{category}</Text>
      </View>

      <Card style={styles.questionCard}>
        <CardContent>
          <Text style={styles.question}>{currentQuestion.question}</Text>
          
          <View style={styles.options}>
            {currentQuestion.options.map((option, index) => (
              <Pressable
                key={index}
                style={[
                  styles.option,
                  selectedAnswer === index && styles.selectedOption,
                  showExplanation && index === currentQuestion.correctAnswer && styles.correctOption,
                  showExplanation && selectedAnswer === index && 
                  selectedAnswer !== currentQuestion.correctAnswer && styles.incorrectOption,
                ]}
                onPress={() => !showExplanation && handleAnswerSelect(index)}
                disabled={showExplanation}
              >
                <Text style={[
                  styles.optionText,
                  selectedAnswer === index && styles.selectedOptionText,
                  showExplanation && index === currentQuestion.correctAnswer && styles.correctOptionText,
                ]}>
                  {option}
                </Text>
                {showExplanation && index === currentQuestion.correctAnswer && (
                  <Ionicons name="checkmark-circle" size={24} color="#059669" />
                )}
                {showExplanation && selectedAnswer === index && 
                 selectedAnswer !== currentQuestion.correctAnswer && (
                  <Ionicons name="close-circle" size={24} color="#dc2626" />
                )}
              </Pressable>
            ))}
          </View>

          {showExplanation && (
            <Animated.View 
              entering={FadeInUp}
              exiting={FadeOutDown}
              style={styles.explanation}
            >
              <Text style={styles.explanationTitle}>Explanation</Text>
              <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
              <Text style={styles.reference}>Reference: {currentQuestion.references.join(', ')}</Text>
            </Animated.View>
          )}
        </CardContent>
      </Card>

      {showExplanation && (
        <View style={styles.actions}>
          <Button onPress={handleNext}>
            {currentIndex < questions.length - 1 ? 'Next Question' : 'View Results'}
          </Button>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  progress: {
    fontSize: 16,
    color: '#888888',
    marginBottom: 8,
  },
  category: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  loading: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  questionCard: {
    margin: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 20,
  },
  options: {
    gap: 12,
  },
  option: {
    backgroundColor: '#f4f4f5',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#dbeafe',
    borderColor: '#2563eb',
    borderWidth: 2,
  },
  correctOption: {
    backgroundColor: '#dcfce7',
    borderColor: '#059669',
    borderWidth: 2,
  },
  incorrectOption: {
    backgroundColor: '#fee2e2',
    borderColor: '#dc2626',
    borderWidth: 2,
  },
  optionText: {
    fontSize: 16,
    color: '#1a1a1a',
    flex: 1,
    marginRight: 12,
  },
  selectedOptionText: {
    fontWeight: '600',
  },
  correctOptionText: {
    color: '#059669',
    fontWeight: '600',
  },
  explanation: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  reference: {
    fontSize: 12,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  actions: {
    padding: 20,
    paddingBottom: 40,
  },
});