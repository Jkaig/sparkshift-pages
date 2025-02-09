import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const PricingScreen = () => {
  const plans = [
    {
      title: 'Basic',
      price: '$19',
      period: '/month',
      features: [
        'Basic OJR Tracking',
        '5 Practice Tests',
        'Community Access',
      ],
      buttonText: 'Get Started',
      popular: false,
    },
    {
      title: 'Professional',
      price: '$39',
      period: '/month',
      features: [
        'Advanced OJR Tracking',
        'Unlimited Practice Tests',
        'AI Study Assistant',
        'Priority Support',
      ],
      buttonText: 'Start Free Trial',
      popular: true,
    },
    {
      title: 'Enterprise',
      price: '$99',
      period: '/month',
      features: [
        'Custom OJR Solutions',
        'Team Management',
        'API Access',
        'Dedicated Support',
      ],
      buttonText: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your Plan</Text>
          <Text style={styles.subtitle}>
            Select the perfect plan for your journey
          </Text>
        </View>

        <View style={styles.plansContainer}>
          {plans.map((plan, index) => (
            <View
              key={index}
              style={[
                styles.planCard,
                plan.popular && styles.popularCard,
              ]}
            >
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularBadgeText}>Most Popular</Text>
                </View>
              )}
              <Text style={styles.planTitle}>{plan.title}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{plan.price}</Text>
                <Text style={styles.period}>{plan.period}</Text>
              </View>
              <View style={styles.featuresContainer}>
                {plan.features.map((feature, featureIndex) => (
                  <View key={featureIndex} style={styles.featureItem}>
                    <Text style={styles.featureText}>✓ {feature}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity
                style={[
                  styles.button,
                  plan.popular && styles.popularButton,
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    plan.popular && styles.popularButtonText,
                  ]}
                >
                  {plan.buttonText}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
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
  header: {
    padding: Platform.OS === 'web' ? 40 : 20,
    alignItems: 'center',
    maxWidth: Platform.OS === 'web' ? 800 : '100%',
    marginHorizontal: 'auto',
  },
  title: {
    fontSize: Platform.OS === 'web' ? 48 : 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: Platform.OS === 'web' ? 20 : 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  plansContainer: {
    padding: 20,
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: Platform.OS === 'web' ? 1200 : '100%',
    marginHorizontal: 'auto',
  },
  planCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: Platform.OS === 'web' ? 30 : 20,
    margin: Platform.OS === 'web' ? 15 : 0,
    marginBottom: 20,
    position: 'relative',
    width: Platform.OS === 'web' ? 350 : '100%',
  },
  popularCard: {
    borderColor: '#FFD700',
    borderWidth: 1,
    transform: [{ scale: 1.05 }],
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    right: 20,
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularBadgeText: {
    color: '#1A1A2E',
    fontWeight: 'bold',
    fontSize: 12,
  },
  planTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  price: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  period: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  button: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  popularButton: {
    backgroundColor: '#FFD700',
  },
  buttonText: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 16,
  },
  popularButtonText: {
    color: '#1A1A2E',
  },
});

export default PricingScreen;
