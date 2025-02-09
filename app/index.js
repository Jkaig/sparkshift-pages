import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>SparkShift</Text>
        <Text style={styles.subtitle}>Your Ultimate Electrical Apprenticeship Companion</Text>
        
        <View style={styles.features}>
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Track Hours</Text>
            <Text style={styles.featureText}>
              Easily log and track your apprenticeship hours with our intuitive interface
            </Text>
          </View>
          
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Stay Organized</Text>
            <Text style={styles.featureText}>
              Keep all your certifications and documentation in one secure place
            </Text>
          </View>
          
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Learn & Grow</Text>
            <Text style={styles.featureText}>
              Access resources and study materials to advance your career
            </Text>
          </View>
        </View>

        <Link href="/pricing" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View Pricing</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
  },
  content: {
    padding: Platform.select({ web: 40, default: 20 }),
    alignItems: 'center',
    maxWidth: Platform.select({ web: 1200, default: '100%' }),
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    fontSize: Platform.select({ web: 48, default: 36 }),
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: Platform.select({ web: 24, default: 18 }),
    color: '#B8B8D1',
    textAlign: 'center',
    marginBottom: 40,
  },
  features: {
    flexDirection: Platform.select({ web: 'row', default: 'column' }),
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 40,
    width: '100%',
  },
  featureCard: {
    backgroundColor: '#2A2A4E',
    borderRadius: 12,
    padding: 24,
    width: Platform.select({ web: 300, default: '100%' }),
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#B8B8D1',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#4A4AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
