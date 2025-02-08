import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { CheckCircle } from 'lucide-react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import type { User } from 'firebase/auth';

// Initialize Firebase Auth
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const features = [
  "Daily 5-minute practice quizzes",
  "Progress tracking & analytics",
  "Weakness identification",
  "State-specific content",
  "Mobile & desktop access",
  "Regular content updates"
];

const PricingSection = () => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleSignIn = async (plan: 'monthly' | 'quiz') => {
    try {
      if (!user) {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
      }
      // After sign in or if already signed in, handle subscription
      if (plan === 'monthly') {
        window.location.href = '/checkout/monthly';
      } else {
        window.location.href = '/checkout/quiz';
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-[#001f3f] to-[#003366] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-blue-500/10 text-blue-300 rounded-full text-sm font-medium mb-4">
            Simple, Transparent Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Affordable Exam Prep That Works
          </h2>
          <p className="text-xl text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
            Less than $1 a day for comprehensive electrician exam preparation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Monthly Subscription */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy" />
            <div className="relative bg-black/90 rounded-xl p-8 h-full flex flex-col">
              <div className="text-center mb-6">
                <span className="inline-block px-4 py-1 bg-blue-500/10 text-blue-300 rounded-full text-sm font-medium mb-4">
                  Most Popular
                </span>
                <h3 className="text-2xl font-bold text-white mb-4">Monthly Subscription</h3>
                <div className="flex justify-center items-baseline mb-4">
                  <span className="text-6xl font-extrabold text-white">$19</span>
                  <span className="text-blue-300 ml-2">/month</span>
                </div>
                <p className="text-blue-200/80">Per state access</p>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start text-blue-100/90 gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5"></CheckCircle>
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                onClick={() => handleSignIn('monthly')}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
              >
                {user ? 'Start Free Trial' : 'Sign in to Start'}
              </Button>
            </div>
          </motion.div>

          {/* Quiz Packet */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy" />
            <div className="relative bg-black/90 rounded-xl p-8 h-full flex flex-col">
              <div className="text-center mb-6">
                <span className="inline-block px-4 py-1 bg-purple-500/10 text-purple-300 rounded-full text-sm font-medium mb-4">
                  One-Time Purchase                             
                </span>
                <h3 className="text-2xl font-bold text-white mb-4">Quiz Packet</h3>
                <div className="flex justify-center items-baseline mb-4">
                  <span className="text-6xl font-extrabold text-white">$39</span>
                  <span className="text-purple-300 ml-2">/state</span>
                </div>
                <p className="text-purple-200/80">Lifetime access</p>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start text-purple-100/90 gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5"></CheckCircle>
                  <span className="leading-relaxed">Complete question bank access</span>
                </li>
                <li className="flex items-start text-purple-100/90 gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5"></CheckCircle>
                  <span className="leading-relaxed">State-specific content</span>
                </li>
                <li className="flex items-start text-purple-100/90 gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5"></CheckCircle>
                  <span className="leading-relaxed">Practice test mode</span>
                </li>
                <li className="flex items-start text-purple-100/90 gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5"></CheckCircle>
                  <span className="leading-relaxed">Detailed explanations</span>
                </li>
                <li className="flex items-start text-purple-100/90 gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5"></CheckCircle>
                  <span className="leading-relaxed">Lifetime access</span>
                </li>
                <li className="flex items-start text-purple-100/90 gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5"></CheckCircle>
                  <span className="leading-relaxed">Download for offline use</span>
                </li>
              </ul>
              <Button 
                onClick={() => handleSignIn('quiz')}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
              >
                {user ? 'Purchase Now' : 'Sign in to Purchase'}
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
            <span>Try risk-free with our 7-day money-back guarantee</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
