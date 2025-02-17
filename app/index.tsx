import { View, Text, StyleSheet, Pressable, Image, useWindowDimensions, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import Animated, { FadeInUp, FadeInRight } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

export default function Index() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heroSection}>
        <Animated.View 
          entering={FadeInUp.duration(1000)}
          style={[styles.content, isMobile && styles.contentMobile]}
        >
          <Image 
            source={require('../assets/icon.png')}
            style={[styles.logo, isMobile && styles.logoMobile]}
            resizeMode="contain"
          />
          <Text style={[styles.title, isMobile && styles.titleMobile]}>
            Master Your Electrical Exam
          </Text>
          <Text style={[styles.subtitle, isMobile && styles.subtitleMobile]}>
            AI-Powered Practice Tests Tailored to Your State's Requirements
          </Text>
          
          <View style={styles.features}>
            <Animated.View 
              entering={FadeInRight.delay(200).duration(800)}
              style={styles.feature}
            >
              <Ionicons name="flash" size={24} color="#5DADE2" />
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Smart Practice Tests</Text>
                <Text style={styles.featureDescription}>
                  AI-powered questions adapt to your skill level
                </Text>
              </View>
            </Animated.View>
            
            <Animated.View 
              entering={FadeInRight.delay(400).duration(800)}
              style={styles.feature}
            >
              <Ionicons name="stats-chart" size={24} color="#5DADE2" />
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Real-time Analytics</Text>
                <Text style={styles.featureDescription}>
                  Track your progress and identify weak areas
                </Text>
              </View>
            </Animated.View>
            
            <Animated.View 
              entering={FadeInRight.delay(600).duration(800)}
              style={styles.feature}
            >
              <Ionicons name="book" size={24} color="#5DADE2" />
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>State-Specific Content</Text>
                <Text style={styles.featureDescription}>
                  Updated with latest code requirements
                </Text>
              </View>
            </Animated.View>
          </View>
          
          <View style={styles.cta}>
            <Link href="/(tabs)" asChild>
              <Pressable style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Start Free Trial</Text>
              </Pressable>
            </Link>
            <Link href="/pricing" asChild>
              <Pressable style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>View Plans</Text>
              </Pressable>
            </Link>
          </View>
        </Animated.View>
      </View>

      <View style={styles.statsSection}>
        <Animated.View 
          entering={FadeInUp.delay(800).duration(1000)}
          style={styles.stats}
        >
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>50,000+</Text>
            <Text style={styles.statLabel}>Successful Students</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>98%</Text>
            <Text style={styles.statLabel}>Pass Rate</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>All 50</Text>
            <Text style={styles.statLabel}>States Covered</Text>
          </View>
        </Animated.View>
      </View>

      <View style={styles.testimonialSection}>
        <Animated.View 
          entering={FadeInUp.delay(1000).duration(1000)}
          style={styles.testimonial}
        >
          <Text style={styles.testimonialText}>
            "SparkShift helped me pass my exam on the first try. The practice questions are spot-on and the analytics helped me focus on my weak areas."
          </Text>
          <Text style={styles.testimonialAuthor}>
            - John D., Licensed Electrician
          </Text>
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0B1E',
  },
  heroSection: {
    minHeight: 600,
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
    maxWidth: 1200,
    width: '100%',
    marginHorizontal: 'auto',
  },
  contentMobile: {
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 32,
  },
  logoMobile: {
    width: 80,
    height: 80,
    marginBottom: 24,
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 64,
  },
  titleMobile: {
    fontSize: 36,
    lineHeight: 44,
  },
  subtitle: {
    fontSize: 24,
    color: '#5DADE2',
    textAlign: 'center',
    marginBottom: 64,
    maxWidth: 600,
    lineHeight: 32,
  },
  subtitleMobile: {
    fontSize: 18,
    marginBottom: 48,
    lineHeight: 26,
  },
  features: {
    gap: 24,
    marginBottom: 64,
    width: '100%',
    maxWidth: 800,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: 'rgba(93, 173, 226, 0.1)',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(93, 173, 226, 0.2)',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    color: '#5DADE2',
    fontSize: 14,
    lineHeight: 20,
  },
  cta: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#3498DB',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    minWidth: 200,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3498DB',
    minWidth: 200,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#3498DB',
    fontSize: 18,
    fontWeight: '600',
  },
  statsSection: {
    backgroundColor: '#16213E',
    paddingVertical: 64,
    paddingHorizontal: 20,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 48,
    maxWidth: 1200,
    marginHorizontal: 'auto',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#5DADE2',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  statDivider: {
    width: 1,
    height: 80,
    backgroundColor: 'rgba(93, 173, 226, 0.2)',
    display: 'none',
    '@media (min-width: 768px)': {
      display: 'block',
    },
  },
  testimonialSection: {
    paddingVertical: 80,
    paddingHorizontal: 20,
    backgroundColor: '#0A0B1E',
  },
  testimonial: {
    maxWidth: 800,
    marginHorizontal: 'auto',
    alignItems: 'center',
  },
  testimonialText: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 24,
    fontStyle: 'italic',
  },
  testimonialAuthor: {
    fontSize: 18,
    color: '#5DADE2',
    textAlign: 'center',
  },
});