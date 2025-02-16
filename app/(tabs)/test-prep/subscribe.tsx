import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/lib/providers/AuthProvider';
import { createCheckoutSession } from '@/lib/services/stripe';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const plans = [
  {
    id: 'monthly',
    name: 'Monthly Access',
    price: '$19.99',
    features: [
      'Unlimited practice tests',
      'State-specific questions',
      'Performance analytics',
      'Study materials',
      'Progress tracking',
    ],
    priceId: 'price_monthly',
  },
  {
    id: 'yearly',
    name: 'Annual Access',
    price: '$199.99',
    features: [
      'All Monthly features',
      'Save 17%',
      'Advanced analytics',
      'Priority support',
      'Offline access',
    ],
    priceId: 'price_yearly',
    popular: true,
  },
];

export default function SubscribeScreen() {
  const { user, profile } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (priceId: string) => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { sessionId, hasDiscount } = await createCheckoutSession(priceId);
      const stripe = await getStripe();
      
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error('Stripe checkout error:', error);
        }
      }
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose Your Plan</Text>
        <Text style={styles.subtitle}>Get unlimited access to exam preparation materials</Text>
      </View>

      {profile?.sparkshiftMobileVerified && (
        <Animated.View entering={FadeInUp.duration(500)} style={styles.discountBanner}>
          <Ionicons name="checkmark-circle" size={24} color="#059669" />
          <Text style={styles.discountText}>
            SparkShift Mobile User Discount: $5 off monthly plans!
          </Text>
        </Animated.View>
      )}

      <View style={styles.plans}>
        {plans.map((plan, index) => (
          <Animated.View
            key={plan.id}
            entering={FadeInUp.delay(index * 100)}
            style={styles.planCard}
          >
            <Card>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                {plan.popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularText}>Most Popular</Text>
                  </View>
                )}
              </CardHeader>
              <CardContent>
                <Text style={styles.price}>
                  {plan.price}
                  <Text style={styles.period}>
                    /{plan.id === 'monthly' ? 'month' : 'year'}
                  </Text>
                </Text>
                
                {profile?.sparkshiftMobileVerified && plan.id === 'monthly' && (
                  <View style={styles.discountPrice}>
                    <Text style={styles.originalPrice}>{plan.price}</Text>
                    <Text style={styles.discountedPrice}>$14.99/month</Text>
                  </View>
                )}

                <View style={styles.features}>
                  {plan.features.map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                      <Ionicons name="checkmark" size={20} color="#059669" />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                <Button
                  onPress={() => handleSubscribe(plan.priceId)}
                  disabled={loading}
                  style={styles.subscribeButton}
                >
                  {loading ? 'Processing...' : 'Subscribe Now'}
                </Button>
              </CardContent>
            </Card>
          </Animated.View>
        ))}
      </View>

      <View style={styles.guarantee}>
        <Ionicons name="shield-checkmark" size={32} color="#059669" />
        <Text style={styles.guaranteeTitle}>30-Day Money-Back Guarantee</Text>
        <Text style={styles.guaranteeText}>
          If you're not satisfied with our platform, we'll refund your subscription
          within the first 30 days - no questions asked.
        </Text>
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
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc',
  },
  discountBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#059669',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  discountText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  plans: {
    padding: 20,
    gap: 20,
  },
  planCard: {
    width: '100%',
  },
  popularBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  popularText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  price: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  period: {
    fontSize: 16,
    color: '#666666',
  },
  discountPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  originalPrice: {
    fontSize: 16,
    color: '#666666',
    textDecorationLine: 'line-through',
  },
  discountedPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669',
  },
  features: {
    marginVertical: 24,
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  subscribeButton: {
    width: '100%',
  },
  guarantee: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 40,
  },
  guaranteeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginVertical: 8,
  },
  guaranteeText: {
    fontSize: 14,
    color: '#cccccc',
    textAlign: 'center',
  },
});