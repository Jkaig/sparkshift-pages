import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Link } from 'expo-router';

export default function PricingScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const plans = [
    {
      name: 'Basic',
      price: '$29.99',
      period: '/month',
      features: [
        'Smart Scheduling',
        'Resource Library',
        'Basic Support',
        'Single User',
      ],
    },
    {
      name: 'Pro',
      price: '$49.99',
      period: '/month',
      features: [
        'All Basic Features',
        'Advanced Analytics',
        'Priority Support',
        'Up to 5 Users',
        'Custom Reports',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '$99.99',
      period: '/month',
      features: [
        'All Pro Features',
        'Dedicated Support',
        'Unlimited Users',
        'API Access',
        'Custom Integration',
        'Training Sessions',
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose Your Plan</Text>
        <Text style={styles.subtitle}>
          Select the perfect plan for your electrical business needs
        </Text>
      </View>

      <View style={[styles.plansContainer, isMobile && styles.plansContainerMobile]}>
        {plans.map((plan, index) => (
          <View
            key={plan.name}
            style={[
              styles.planCard,
              plan.popular && styles.popularPlan,
            ]}
          >
            {plan.popular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularBadgeText}>Most Popular</Text>
              </View>
            )}
            <Text style={styles.planName}>{plan.name}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{plan.price}</Text>
              <Text style={styles.period}>{plan.period}</Text>
            </View>
            <View style={styles.featuresContainer}>
              {plan.features.map((feature, featureIndex) => (
                <Text key={featureIndex} style={styles.feature}>
                  • {feature}
                </Text>
              ))}
            </View>
            <TouchableOpacity
              style={[
                styles.selectButton,
                plan.popular && styles.popularButton,
              ]}
            >
              <Text style={styles.selectButtonText}>Select Plan</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.faq}>
        <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>Can I change plans later?</Text>
          <Text style={styles.faqAnswer}>
            Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
          </Text>
        </View>
        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>Is there a free trial?</Text>
          <Text style={styles.faqAnswer}>
            Yes, all plans come with a 14-day free trial. No credit card required.
          </Text>
        </View>
      </View>
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
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#cccccc',
    textAlign: 'center',
  },
  plansContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 20,
    padding: 20,
  },
  plansContainerMobile: {
    flexDirection: 'column',
  },
  planCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    padding: 25,
    width: 300,
    alignItems: 'center',
    position: 'relative',
  },
  popularPlan: {
    backgroundColor: '#1c2834',
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  popularBadgeText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  planName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 20,
  },
  price: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  period: {
    fontSize: 16,
    color: '#cccccc',
    marginLeft: 5,
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 20,
  },
  feature: {
    color: '#cccccc',
    fontSize: 16,
    marginVertical: 5,
  },
  selectButton: {
    backgroundColor: '#2c2c2c',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  popularButton: {
    backgroundColor: '#007AFF',
  },
  selectButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  faq: {
    padding: 20,
    marginTop: 20,
  },
  faqTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  faqItem: {
    marginBottom: 20,
  },
  faqQuestion: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 10,
  },
  faqAnswer: {
    fontSize: 16,
    color: '#cccccc',
    lineHeight: 24,
  },
});
