import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, Linking, Animated } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current;
  const fadeAnim4 = useRef(new Animated.Value(0)).current;
  const fadeAnim5 = useRef(new Animated.Value(0)).current;
  const fadeAnim6 = useRef(new Animated.Value(0)).current;
  const fadeAnim7 = useRef(new Animated.Value(0)).current;
  const fadeAnim8 = useRef(new Animated.Value(0)).current;
  const fadeAnim9 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnim2, {
      toValue: 1,
      duration: 200,
      delay: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnim3, {
      toValue: 1,
      duration: 200,
      delay: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnim4, {
      toValue: 1,
      duration: 200,
      delay: 400,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnim5, {
      toValue: 1,
      duration: 200,
      delay: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnim6, {
      toValue: 1,
      duration: 100,
      delay: 0,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnim7, {
      toValue: 1,
      duration: 100,
      delay: 100,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnim8, {
      toValue: 1,
      duration: 100,
      delay: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnim9, {
      toValue: 1,
      duration: 100,
      delay: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const openAppStore = () => {
    Linking.openURL('https://apps.apple.com/app/sparkshift/id123456789');
  };

  const openPlayStore = () => {
    Linking.openURL('https://play.google.com/store/apps/details?id=com.sparkshift.app');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Animated.View 
          style={[
            styles.heroContent,
            {
              opacity: fadeAnim,
              transform: [{
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              }],
            },
          ]}
        >
          <Image 
            source={require('../../assets/icon.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>SparkShift</Text>
          <Text style={styles.subtitle}>
            The Ultimate Electrical Exam Prep Platform
          </Text>
          <Text style={styles.description}>
            Join thousands of electrical professionals who trust SparkShift for exam preparation and career advancement
          </Text>
          <View style={styles.heroButtons}>
            <Link href="/test-prep/subscribe" asChild>
              <Pressable style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Start Free Trial</Text>
              </Pressable>
            </Link>
            <Link href="/test-prep" asChild>
              <Pressable style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Explore Features</Text>
              </Pressable>
            </Link>
          </View>
        </Animated.View>
      </View>

      <View style={styles.appPromo}>
        <Text style={styles.sectionTitle}>Get the SparkShift Mobile App</Text>
        <Text style={styles.sectionSubtitle}>
          Study anywhere, anytime with our mobile app
        </Text>
        <View style={styles.appFeatures}>
          <Animated.View 
            style={[
              styles.appFeature,
              {
                opacity: fadeAnim2,
                transform: [{
                  translateY: fadeAnim2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                }],
              },
            ]}
          >
            <Ionicons name="phone-portrait" size={32} color="#007AFF" />
            <Text style={styles.featureTitle}>Mobile-First Design</Text>
            <Text style={styles.featureText}>
              Optimized for on-the-go learning with offline access
            </Text>
          </Animated.View>
          <Animated.View 
            style={[
              styles.appFeature,
              {
                opacity: fadeAnim3,
                transform: [{
                  translateY: fadeAnim3.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                }],
              },
            ]}
          >
            <Ionicons name="flash" size={32} color="#007AFF" />
            <Text style={styles.featureTitle}>Quick Practice</Text>
            <Text style={styles.featureText}>
              5-15 minute quizzes perfect for busy schedules
            </Text>
          </Animated.View>
          <Animated.View 
            style={[
              styles.appFeature,
              {
                opacity: fadeAnim4,
                transform: [{
                  translateY: fadeAnim4.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                }],
              },
            ]}
          >
            <Ionicons name="trending-up" size={32} color="#007AFF" />
            <Text style={styles.featureTitle}>Progress Tracking</Text>
            <Text style={styles.featureText}>
              Monitor your improvement across all topics
            </Text>
          </Animated.View>
        </View>
        <Animated.View 
          style={[
            styles.savingsBanner,
            {
              opacity: fadeAnim5,
              transform: [{
                translateY: fadeAnim5.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              }],
            },
          ]}
        >
          <Ionicons name="star" size={24} color="#FFD700" />
          <Text style={styles.savingsText}>
            Mobile app subscribers get $5 off monthly web access!
          </Text>
        </Animated.View>
        <View style={styles.appStoreButtons}>
          <Pressable style={styles.storeButton} onPress={openAppStore}>
            <Ionicons name="logo-apple" size={24} color="#FFFFFF" style={styles.storeIcon} />
            <View>
              <Text style={styles.storeSubtext}>Download on the</Text>
              <Text style={styles.storeButtonText}>App Store</Text>
            </View>
          </Pressable>
          <Pressable style={styles.storeButton} onPress={openPlayStore}>
            <Ionicons name="logo-google-playstore" size={24} color="#FFFFFF" style={styles.storeIcon} />
            <View>
              <Text style={styles.storeSubtext}>Get it on</Text>
              <Text style={styles.storeButtonText}>Google Play</Text>
            </View>
          </Pressable>
        </View>
      </View>

      <View style={styles.testimonials}>
        <Text style={styles.sectionTitle}>What Our Users Say</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.testimonialScroll}>
          {[
            {
              name: "John D.",
              role: "Licensed Electrician",
              text: "SparkShift helped me pass my exam on the first try. The practice questions are spot-on!"
            },
            {
              name: "Sarah M.",
              role: "Apprentice Electrician",
              text: "The mobile app is perfect for studying during breaks. Love the quick practice sessions."
            },
            {
              name: "Mike R.",
              role: "Master Electrician",
              text: "Best exam prep platform I've used. The cross-platform sync is seamless."
            }
          ].map((testimonial, index) => (
            <Animated.View 
              key={index}
              style={[
                styles.testimonialCard,
                {
                  opacity: index === 0 ? fadeAnim6 : index === 1 ? fadeAnim7 : fadeAnim8,
                  transform: [{
                    translateY: index === 0 ? fadeAnim6.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }) : index === 1 ? fadeAnim7.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }) : fadeAnim8.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  }],
                },
              ]}
            >
              <Text style={styles.testimonialText}>{testimonial.text}</Text>
              <Text style={styles.testimonialName}>{testimonial.name}</Text>
              <Text style={styles.testimonialRole}>{testimonial.role}</Text>
            </Animated.View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.cta}>
        <Text style={styles.ctaTitle}>Ready to Get Started?</Text>
        <Text style={styles.ctaText}>
          Join SparkShift today and take your exam preparation to the next level
        </Text>
        <Link href="/test-prep/subscribe" asChild>
          <Pressable style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Start Your Free Trial</Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0B1E',
  },
  hero: {
    padding: 20,
    paddingTop: 60,
    minHeight: 600,
    backgroundColor: '#0A0B1E',
  },
  heroContent: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 1200,
    marginHorizontal: 'auto',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 28,
    color: '#5DADE2',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#AAAAAA',
    textAlign: 'center',
    marginBottom: 32,
    maxWidth: 600,
    lineHeight: 28,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 20,
  },
  primaryButton: {
    backgroundColor: '#3498DB',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 3,
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
  },
  secondaryButtonText: {
    color: '#3498DB',
    fontSize: 18,
    fontWeight: '600',
  },
  appPromo: {
    padding: 40,
    backgroundColor: '#16213E',
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 20,
    color: '#AAAAAA',
    textAlign: 'center',
    marginBottom: 48,
  },
  appFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 32,
    marginBottom: 48,
  },
  appFeature: {
    width: 300,
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#1A1B3E',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#3A3B5E',
  },
  featureTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 16,
    color: '#AAAAAA',
    textAlign: 'center',
    lineHeight: 24,
  },
  savingsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1B3E',
    padding: 24,
    borderRadius: 16,
    marginBottom: 32,
    gap: 16,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  savingsText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  appStoreButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    flexWrap: 'wrap',
  },
  storeButton: {
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 200,
    gap: 12,
  },
  storeIcon: {
    marginRight: 8,
  },
  storeSubtext: {
    color: '#AAAAAA',
    fontSize: 12,
  },
  storeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  testimonials: {
    padding: 40,
    backgroundColor: '#0A0B1E',
  },
  testimonialScroll: {
    marginTop: 32,
  },
  testimonialCard: {
    width: 320,
    backgroundColor: '#16213E',
    padding: 32,
    borderRadius: 16,
    marginRight: 24,
    borderWidth: 1,
    borderColor: '#3A3B5E',
  },
  testimonialText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 24,
    fontStyle: 'italic',
    lineHeight: 24,
  },
  testimonialName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5DADE2',
  },
  testimonialRole: {
    fontSize: 14,
    color: '#AAAAAA',
  },
  cta: {
    padding: 60,
    alignItems: 'center',
    backgroundColor: '#16213E',
    margin: 40,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#3A3B5E',
  },
  ctaTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  ctaText: {
    fontSize: 20,
    color: '#AAAAAA',
    textAlign: 'center',
    marginBottom: 32,
    maxWidth: 600,
    lineHeight: 28,
  },
  ctaButton: {
    backgroundColor: '#3498DB',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 12,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
});