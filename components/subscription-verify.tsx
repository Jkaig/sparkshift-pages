import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { signInWithGoogle, signInWithApple, sendEmailSignInLink, checkSubscriptionStatus } from '@/lib/services/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function SubscriptionVerify() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
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

  const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      const email = emailInputRef.current?.value;
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
    <Card>
      <CardHeader>
        <CardTitle>Verify Your Subscription</CardTitle>
        <CardDescription>
          Sign in with your Sparkshift Mobile account to get the special pricing
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {verificationSent ? (
          <Alert>
            <AlertDescription>
              Check your email for a verification link. You can close this window.
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full"
                disabled={loading}
                onClick={handleGoogleSignIn}
              >
                Continue with Google
              </Button>
              
              <Button
                variant="outline"
                className="w-full"
                disabled={loading}
                onClick={handleAppleSignIn}
              >
                Continue with Apple
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              </div>
              
              <form onSubmit={handleEmailSignIn} className="space-y-4">
                <Input
                  ref={emailInputRef}
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  error={error || undefined}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Verification Link'}
                </Button>
              </form>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
