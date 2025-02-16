import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Image } from 'expo-image';

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
];

const durations = [
  { value: '5', label: '5 minutes' },
  { value: '10', label: '10 minutes' },
  { value: '15', label: '15 minutes' },
  { value: '30', label: '30 minutes' },
  { value: '60', label: '1 hour' }
];

export default function TestSetupScreen() {
  const [state, setState] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStartTest = async () => {
    if (!state || !duration) {
      return;
    }

    setLoading(true);
    try {
      // Navigate to the quiz with selected parameters
      router.push({
        pathname: '/test-prep/quiz',
        params: {
          state,
          duration,
        }
      });
    } catch (error) {
      console.error('Error starting test:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/app_icon.png')}
          style={styles.logo}
          contentFit="contain"
        />
        <Text style={styles.title}>Test Setup</Text>
        <Text style={styles.subtitle}>Customize your practice test</Text>
      </View>

      <Animated.View 
        entering={FadeInUp.duration(500)}
        style={styles.content}
      >
        <Card>
          <CardContent>
            <View style={styles.form}>
              <View style={styles.field}>
                <Text style={styles.label}>Select Your State</Text>
                <Select
                  value={state}
                  onValueChange={setState}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Test Duration</Text>
                <Select
                  value={duration}
                  onValueChange={setDuration}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map((d) => (
                      <SelectItem key={d.value} value={d.value}>
                        {d.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </View>

              <View style={styles.info}>
                <Text style={styles.infoText}>
                  Your test will be customized based on:
                </Text>
                <Text style={styles.infoItem}>• Your state's specific requirements</Text>
                <Text style={styles.infoItem}>• Latest NEC code updates</Text>
                <Text style={styles.infoItem}>• Your previous performance</Text>
                <Text style={styles.infoItem}>• Common exam topics</Text>
              </View>

              <Button
                onClick={handleStartTest}
                disabled={!state || !duration || loading}
                style={styles.button}
              >
                {loading ? 'Preparing Test...' : 'Start Practice Test'}
              </Button>
            </View>
          </CardContent>
        </Card>
      </Animated.View>
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
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#cccccc',
    marginBottom: 24,
  },
  content: {
    padding: 20,
  },
  form: {
    gap: 24,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  info: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  infoItem: {
    fontSize: 14,
    color: '#4b5563',
  },
  button: {
    marginTop: 16,
  },
});