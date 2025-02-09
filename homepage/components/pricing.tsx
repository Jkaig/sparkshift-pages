import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@/homepage/components/ui/button';
import { motion } from 'framer-motion';

const PricingTier = ({ title, price, features, buttonText }: {
  title: string;
  price: string;
  features: string[];
  buttonText: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col p-6 bg-white rounded-lg shadow-lg"
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
  </motion.div>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
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
