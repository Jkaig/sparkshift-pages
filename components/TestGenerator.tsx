import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { generateTest, TestQuestion, TestGenerationParams } from '../lib/services/openai';
import { trackEvent } from '../lib/services/analytics';

export const TestGenerator: React.FC = () => {
  const [params, setParams] = useState<TestGenerationParams>({
    subject: '',
    difficulty: 'medium',
    numberOfQuestions: 5,
    topics: [],
    timeLimit: 30
  });

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!params.subject) {
      setError('Please enter a subject');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const generatedQuestions = await generateTest(params);
      setQuestions(generatedQuestions);
      
      trackEvent('test_generated', {
        subject: params.subject,
        difficulty: params.difficulty,
        question_count: params.numberOfQuestions
      });
    } catch (err) {
      setError('Failed to generate test. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Subject</Text>
        <TextInput
          style={styles.input}
          value={params.subject}
          onChangeText={(text) => setParams({ ...params, subject: text })}
          placeholder="Enter subject (e.g., JavaScript, React)"
        />

        <Text style={styles.label}>Difficulty</Text>
        <View style={styles.difficultyContainer}>
          {['easy', 'medium', 'hard'].map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.difficultyButton,
                params.difficulty === level && styles.selectedDifficulty
              ]}
              onPress={() => setParams({ ...params, difficulty: level as 'easy' | 'medium' | 'hard' })}
            >
              <Text style={[
                styles.difficultyText,
                params.difficulty === level && styles.selectedDifficultyText
              ]}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Number of Questions</Text>
        <TextInput
          style={styles.input}
          value={String(params.numberOfQuestions)}
          onChangeText={(text) => setParams({ ...params, numberOfQuestions: parseInt(text) || 5 })}
          keyboardType="numeric"
          placeholder="Enter number of questions"
        />

        <Text style={styles.label}>Time Limit (minutes)</Text>
        <TextInput
          style={styles.input}
          value={String(params.timeLimit)}
          onChangeText={(text) => setParams({ ...params, timeLimit: parseInt(text) || 30 })}
          keyboardType="numeric"
          placeholder="Enter time limit in minutes"
        />

        <TouchableOpacity
          style={styles.generateButton}
          onPress={handleGenerate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.generateButtonText}>Generate Test</Text>
          )}
        </TouchableOpacity>

        {error && <Text style={styles.error}>{error}</Text>}
      </View>

      {questions.length > 0 && (
        <View style={styles.questions}>
          <Text style={styles.questionsTitle}>Generated Test</Text>
          {questions.map((q, i) => (
            <View key={i} style={styles.question}>
              <Text style={styles.questionText}>{i + 1}. {q.question}</Text>
              {q.options.map((option, j) => (
                <TouchableOpacity
                  key={j}
                  style={[
                    styles.option,
                    j === q.correctAnswer && styles.correctOption
                  ]}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
              <Text style={styles.explanation}>Explanation: {q.explanation}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  form: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  difficultyContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  difficultyButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  selectedDifficulty: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  difficultyText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedDifficultyText: {
    color: '#fff',
  },
  generateButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: '#ff3b30',
    marginTop: 8,
    fontSize: 14,
  },
  questions: {
    marginTop: 24,
  },
  questionsTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: '#333',
  },
  question: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  option: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 8,
  },
  correctOption: {
    borderColor: '#34c759',
    backgroundColor: '#f0fff4',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  explanation: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});
