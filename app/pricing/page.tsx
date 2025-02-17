import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
  trial?: string;
  special?: boolean;
}

interface Faq {
  question: string;
  answer: string;
}

const plans: Plan[] = [
  {
    name: "Monthly Subscription",
    price: "$19.99",
    period: "/month",
    description: "Most popular choice for exam preparation",
    features: [
      "Daily 5-15 minute quizzes",
      "State-specific content",
      "Progress tracking",
      "Daily reminders",
      "Access to all practice materials",
      "Mobile app access"
    ],
    popular: true,
    cta: "Start Free Trial",
    trial: "14-day free trial, cancel anytime"
  },
  {
    name: "Sparkshift Mobile Subscriber",
    price: "$12.99",
    period: "/month",
    description: "Special pricing for our mobile app subscribers",
    features: [
      "All Monthly Subscription features",
      "Verified mobile app integration",
      "Cross-platform progress sync",
      "Priority support",
      "Early access to new features",
      "Discounted renewal rates"
    ],
    cta: "Verify & Subscribe",
    trial: "Already a mobile subscriber? Sign in to verify",
    special: true
  },
  {
    name: "One-Time Package",
    price: "$39.99",
    period: "one-time",
    description: "Perfect if you prefer no subscription",
    features: [
      "Complete set of state quizzes",
      "Lifetime access",
      "Progress tracking",
      "Mobile app access",
      "Download all materials",
      "Study at your own pace"
    ],
    cta: "Buy Now",
    trial: "30-day money-back guarantee"
  }
]

const faqs: Faq[] = [
  {
    question: "How are the daily quizzes structured?",
    answer: "Each quiz takes 5-15 minutes to complete and focuses on different areas of the electrician exam. Questions are carefully curated for your specific state's requirements."
  },
  {
    question: "I'm already a Sparkshift Mobile subscriber. How do I get the discounted rate?",
    answer: "Simply sign in with your Sparkshift Mobile account, and we'll automatically verify your subscription status through Firebase. Once verified, you'll immediately get access to the discounted $12.99/month rate."
  },
  {
    question: "Can I switch states if I move?",
    answer: "Yes! You can switch your state-specific content at any time through your account settings."
  },
  {
    question: "Is there a guarantee?",
    answer: "We offer a 30-day money-back guarantee if you're not satisfied with our service."
  },
  {
    question: "How does the progress tracking work?",
    answer: "Our system tracks your performance in different exam topics, showing your strengths and areas that need improvement. You'll get detailed analytics and recommendations."
  }
]

export default function PricingPage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Start Your Exam Prep Journey Today</Text>
        <Text style={styles.subtitle}>Less than $1 a day to prepare for your electrician exam</Text>
      </View>

      <View style={styles.plansContainer}>
        {plans.map((plan) => (
          <View key={plan.name} style={styles.planCard}>
            <View style={styles.planHeader}>
              <Text style={styles.planName}>{plan.name}</Text>
              {plan.popular && <Text style={styles.badge}>Most Popular</Text>}
              {plan.special && <Text style={styles.badge}>Special Offer</Text>}
            </View>
            <Text style={styles.planPrice}>{plan.price}{plan.period}</Text>
            {plan.trial && (
              <Text style={styles.planTrial}>{plan.trial}</Text>
            )}
            <Text style={styles.planDescription}>{plan.description}</Text>
            
            <View style={styles.featuresList}>
              {plan.features.map((feature, featureIndex) => (
                <Text key={featureIndex} style={styles.feature}>
                  • {feature}
                </Text>
              ))}
            </View>

            <Link href={plan.special ? "/login/verify" : "/login"} asChild>
              <Pressable style={styles.button}>
                <Text style={styles.buttonText}>{plan.cta}</Text>
              </Pressable>
            </Link>
          </View>
        ))}
      </View>

      <View style={styles.faqContainer}>
        <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqItem}>
            <Text style={styles.faqQuestion}>{faq.question}</Text>
            <Text style={styles.faqAnswer}>{faq.answer}</Text>
          </View>
        ))}
      </View>

      <View style={styles.guaranteeContainer}>
        <Text style={styles.guaranteeTitle}>100% Risk-Free Guarantee</Text>
        <Text style={styles.guaranteeText}>
          Try our exam prep risk-free. If you're not satisfied within the first 14 days, we'll refund your subscription - no questions asked.
        </Text>
        <Link href="/contact" asChild>
          <Pressable style={styles.guaranteeButton}>
            <Text style={styles.guaranteeButtonText}>Need help choosing? Contact us</Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  plansContainer: {
    padding: 20,
  },
  planCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  badge: {
    fontSize: 16,
    color: '#0066cc',
    fontWeight: 'bold',
    backgroundColor: '#ddf0ff',
    padding: 5,
    borderRadius: 5,
  },
  planPrice: {
    fontSize: 20,
    color: '#0066cc',
    marginBottom: 10,
  },
  planTrial: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  planDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  featuresList: {
    marginBottom: 20,
  },
  feature: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  button: {
    backgroundColor: '#0066cc',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  faqContainer: {
    padding: 20,
  },
  faqTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  faqItem: {
    marginBottom: 20,
  },
  faqQuestion: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  faqAnswer: {
    fontSize: 16,
    color: '#666',
  },
  guaranteeContainer: {
    padding: 20,
    alignItems: 'center',
  },
  guaranteeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  guaranteeText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  guaranteeButton: {
    backgroundColor: '#0066cc',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  guaranteeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
