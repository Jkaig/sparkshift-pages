import { useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { signInWithGoogle, signInWithApple, sendEmailSignInLink, checkSubscriptionStatus } from '@/lib/services/auth';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';

export default function SubscriptionVerify() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const emailInputRef = useRef<TextInput>(null);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      const user = await signInWithGoogle();
      if (user) {
        const subscription = await checkSubscriptionStatus(user.uid);
        if (subscription.isSubscribed) {
          router.push('/checkout?price=sparkshift');
        } else {
          setError('No active Sparkshift Mobile subscription found.');
        }
      }
    } catch (err) {
      setError('Failed to sign in with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      const user = await signInWithApple();
      if (user) {
        const subscription = await checkSubscriptionStatus(user.uid);
        if (subscription.isSubscribed) {
          router.push('/checkout?price=sparkshift');
        } else {
          setError('No active Sparkshift Mobile subscription found.');
        }
      }
    } catch (err) {
      setError('Failed to sign in with Apple. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      const email = emailInputRef.current?.props.value;
      if (!email) {
        throw new Error('Please enter your email');
      }
      await sendEmailSignInLink(email);
      setVerificationSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.gradientBackground}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Verify Your Subscription</Text>
          <Text style={styles.description}>
            Sign in with your Sparkshift Mobile account to get the special pricing
          </Text>

          {error && (
            <Text style={styles.error}>{error}</Text>
          )}
          
          {verificationSent ? (
            <Text style={styles.error}>
              Check your email for a verification link. You can close this window.
            </Text>
          ) : (
            <View style={styles.form}>
              <TextInput
                ref={emailInputRef}
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Pressable
                style={[styles.button, styles.emailButton]}
                onPress={handleEmailSignIn}
                disabled={loading}
              >
                <FontAwesome name="envelope" size={20} color="white" />
                <Text style={styles.buttonText}>Send Verification Link</Text>
              </Pressable>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              <Pressable
                style={[styles.button, styles.googleButton]}
                onPress={handleGoogleSignIn}
                disabled={loading}
              >
                <FontAwesome name="google" size={20} color="white" />
                <Text style={styles.buttonText}>Continue with Google</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.appleButton]}
                onPress={handleAppleSignIn}
                disabled={loading}
              >
                <FontAwesome name="apple" size={20} color="white" />
                <Text style={styles.buttonText}>Continue with Apple</Text>
              </Pressable>
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    gap: 10,
  },
  emailButton: {
    backgroundColor: '#0066cc',
  },
  googleButton: {
    backgroundColor: '#db4437',
  },
  appleButton: {
    backgroundColor: '#000',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dividerText: {
    color: 'white',
    paddingHorizontal: 10,
  },
  error: {
    color: '#ff6b6b',
    textAlign: 'center',
    marginTop: 10,
  },
});
