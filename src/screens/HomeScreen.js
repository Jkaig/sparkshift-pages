import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const features = [
    {
      icon: '⚡',
      title: 'Smart Scheduling',
      description: 'Efficiently manage your apprenticeship hours and tasks',
    },
    {
      icon: '📱',
      title: 'Mobile First',
      description: 'Access your data anywhere, anytime',
    },
    {
      icon: '📊',
      title: 'Progress Tracking',
      description: 'Monitor your apprenticeship progress in real-time',
    },
    {
      icon: '🤝',
      title: 'Community',
      description: 'Connect with other electrical apprentices',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>SparkShift</Text>
          <Text style={styles.subtitle}>
            Your Ultimate Electrical Apprenticeship Companion
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL('https://apps.apple.com')}
            >
              <Text style={styles.buttonText}>Download on App Store</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL('https://play.google.com')}
            >
              <Text style={styles.buttonText}>Get it on Google Play</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('Pricing')}
          >
            <Text style={styles.navButtonText}>View Pricing</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('Resources')}
          >
            <Text style={styles.navButtonText}>Browse Resources</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
    maxWidth: Platform.OS === 'web' ? 1200 : '100%',
    marginHorizontal: Platform.OS === 'web' ? 'auto' : 0,
  },
  heroSection: {
    alignItems: 'center',
    padding: Platform.OS === 'web' ? 40 : 20,
    paddingTop: Platform.OS === 'web' ? 60 : 40,
    maxWidth: Platform.OS === 'web' ? 800 : '100%',
    marginHorizontal: 'auto',
  },
  logo: {
    width: Platform.OS === 'web' ? 160 : 120,
    height: Platform.OS === 'web' ? 160 : 120,
    marginBottom: 20,
  },
  title: {
    fontSize: Platform.OS === 'web' ? 48 : 32,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: Platform.OS === 'web' ? 24 : 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  button: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#1A1A2E',
    fontWeight: 'bold',
  },
  featuresSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: Platform.OS === 'web' ? 1000 : '100%',
    marginHorizontal: 'auto',
  },
  featureCard: {
    width: Platform.OS === 'web' ? 300 : (width - 60) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 20,
    borderRadius: 15,
    margin: 10,
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    marginBottom: 20,
  },
  navButton: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  navButtonText: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
