import { loadStripe, Stripe } from '@stripe/stripe-js';
import { auth, db } from './firebase';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import Constants from 'expo-constants';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

export const createCheckoutSession = async (priceId: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User must be logged in');

  // Check if user has SparkShift mobile verification
  const userDoc = await getDoc(doc(db, 'users', user.uid));
  const userData = userDoc.data();
  const hasSparkShiftVerification = userData?.sparkshiftMobileVerified || false;

  // Apply $5 discount if user is verified mobile subscriber
  const discountAmount = hasSparkShiftVerification ? 500 : 0; // $5.00 discount in cents

  const checkoutSession = {
    price: priceId,
    success_url: window.location.origin + '/success',
    cancel_url: window.location.origin + '/cancel',
    customer_email: user.email,
    client_reference_id: user.uid,
    allow_promotion_codes: true,
    metadata: {
      userId: user.uid,
      hasDiscount: hasSparkShiftVerification,
      discountAmount,
    },
  };

  // Create a checkout session in Firestore
  const sessionsRef = collection(db, 'stripe_checkout_sessions');
  const sessionDoc = await setDoc(doc(sessionsRef), checkoutSession);

  return { sessionId: sessionDoc.id, hasDiscount: hasSparkShiftVerification };
};

export const verifySparkShiftSubscription = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    const userData = userDoc.data();
    
    if (userData?.sparkshiftMobileSubscriptionId) {
      // Verify subscription status with your backend
      const isValid = await checkMobileSubscriptionStatus(userData.sparkshiftMobileSubscriptionId);
      
      if (isValid) {
        await updateDoc(doc(db, 'users', userId), {
          sparkshiftMobileVerified: true,
          updatedAt: new Date(),
          discountEligible: true,
          discountAmount: 500, // $5.00 in cents
        });
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error('Error verifying SparkShift subscription:', error);
    return false;
  }
};

// Helper function to check mobile subscription status
const checkMobileSubscriptionStatus = async (subscriptionId: string): Promise<boolean> => {
  try {
    const subscriptionDoc = await getDoc(doc(db, 'mobile_subscriptions', subscriptionId));
    const subscription = subscriptionDoc.data();
    
    if (!subscription) return false;
    
    // Check if subscription is active and not expired
    const now = new Date();
    const expiryDate = subscription.expiryDate.toDate();
    
    return subscription.status === 'active' && expiryDate > now;
  } catch (error) {
    console.error('Error checking mobile subscription:', error);
    return false;
  }
};