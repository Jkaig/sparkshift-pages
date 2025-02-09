import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Button } from '@/homepage/components/ui/button';
import Animated, { FadeInUp } from 'react-native-reanimated';

const PricingTier = ({ title, price, features, buttonText }: {
  title: string;
  price: string;
  features: string[];
  buttonText: string;
}) => (
  <Animated.View
    entering={FadeInUp.duration(500)}
    style={styles.card}
  >
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.price}>{price}</Text>
    <View style={styles.featureList}>
      {features.map((feature, index) => (
        <Text key={index} style={styles.feature}>
          {feature}
        </Text>
      ))}
    </View>
    <Button variant="default" size="lg">
      {buttonText}
    </Button>
  </Animated.View>
);

const Pricing = () => {
  const tiers = [
    {
      title: 'Basic',
      price: 'Free',
      features: [
        'Basic time tracking',
        'Simple reporting',
        'Up to 3 projects',
        'Email support'
      ],
      buttonText: 'Get Started'
    },
    {
      title: 'Pro',
      price: '$9.99/mo',
      features: [
        'Advanced time tracking',
        'Detailed analytics',
        'Unlimited projects',
        'Priority support',
        'Team collaboration'
      ],
      buttonText: 'Try Pro'
    },
    {
      title: 'Enterprise',
      price: 'Custom',
      features: [
        'Custom solutions',
        'Dedicated support',
        'SLA guarantee',
        'Advanced security',
        'API access'
      ],
      buttonText: 'Contact Sales'
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Choose Your Plan</Text>
      <Text style={styles.subheading}>
        Select the perfect plan for your needs
      </Text>
      <View style={styles.tiersContainer}>
        {tiers.map((tier, index) => (
          <PricingTier key={index} {...tier} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  subheading: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  tiersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 320,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  price: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0070f3',
    marginBottom: 20,
  },
  featureList: {
    marginBottom: 20,
  },
  feature: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444',
  },
});

export default Pricing;
