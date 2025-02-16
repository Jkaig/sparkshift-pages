import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth, getUserProfile, UserProfile } from '../services/firebase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      
      if (user) {
        try {
          const userProfile = await getUserProfile(user.uid);
          setProfile(userProfile);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load user profile');
        }
      } else {
        setProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    profile,
    loading,
    error,
    isAuthenticated: !!user,
  };
}