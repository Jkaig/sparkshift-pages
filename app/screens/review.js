import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useSearchParams, useRouter } from 'expo-router';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function ReviewScreen() {
  const { evaluationId } = useSearchParams();
  const router = useRouter();
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadEvaluation();
  }, [evaluationId]);

  const loadEvaluation = async () => {
    try {
      if (!evaluationId) {
        throw new Error('No evaluation ID provided');
      }

      const db = getFirestore();
      const evaluationRef = doc(db, 'evaluations', evaluationId);
      const evaluationDoc = await getDoc(evaluationRef);

      if (!evaluationDoc.exists()) {
        throw new Error('Evaluation not found');
      }

      setEvaluation(evaluationDoc.data());
      // Initialize feedback state with existing feedback if any
      if (evaluationDoc.data().feedback) {
        setFeedback(evaluationDoc.data().feedback);
      }
    } catch (err) {
      console.error('Error loading evaluation:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error('You must be signed in to submit a review');
      }

      const db = getFirestore();
      const evaluationRef = doc(db, 'evaluations', evaluationId);

      await updateDoc(evaluationRef, {
        feedback,
        reviewedBy: user.uid,
        reviewedAt: new Date().toISOString(),
        status: 'reviewed'
      });

      // Navigate back or to a success screen
      router.push({
        pathname: '/screens/success',
        params: { message: 'Review submitted successfully' }
      });
    } catch (err) {
      console.error('Error submitting review:', err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading evaluation...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Evaluation Review</Text>
        
        {/* Apprentice Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Apprentice Information</Text>
          <Text style={styles.text}>Name: {evaluation.apprenticeName}</Text>
          <Text style={styles.text}>Date: {new Date(evaluation.date).toLocaleDateString()}</Text>
        </View>

        {/* Skills Assessment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills Assessment</Text>
          {evaluation.skills.map((skill, index) => (
            <View key={index} style={styles.skillItem}>
              <Text style={styles.skillTitle}>{skill.name}</Text>
              <TextInput
                style={styles.input}
                multiline
                placeholder="Enter feedback..."
                value={feedback[skill.id] || ''}
                onChangeText={(text) => setFeedback(prev => ({
                  ...prev,
                  [skill.id]: text
                }))}
              />
            </View>
          ))}
        </View>

        {/* Overall Comments */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overall Comments</Text>
          <TextInput
            style={[styles.input, styles.overallInput]}
            multiline
            placeholder="Enter overall comments..."
            value={feedback.overall || ''}
            onChangeText={(text) => setFeedback(prev => ({
              ...prev,
              overall: text
            }))}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity 
          style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          <Text style={styles.submitButtonText}>
            {submitting ? 'Submitting...' : 'Submit Review'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 5,
  },
  skillItem: {
    marginBottom: 20,
  },
  skillTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 15,
    color: '#ffffff',
    fontSize: 16,
    minHeight: 100,
  },
  overallInput: {
    minHeight: 150,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
