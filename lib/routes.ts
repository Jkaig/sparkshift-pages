import { Href } from 'expo-router';

export const routes = {
  // Auth routes
  auth: {
    login: '/(auth)/login' as Href<string>,
    signup: '/(auth)/signup' as Href<string>,
    forgotPassword: '/(auth)/forgot-password' as Href<string>,
  },
  // Screen routes
  screens: {
    home: '/' as Href<string>,
    pricing: '/(screens)/pricing' as Href<string>,
    resources: '/(screens)/resources' as Href<string>,
    contact: '/(screens)/contact' as Href<string>,
    about: '/(screens)/about' as Href<string>,
    privacy: '/(screens)/privacy' as Href<string>,
    terms: '/(screens)/terms' as Href<string>,
  },
} as const;
