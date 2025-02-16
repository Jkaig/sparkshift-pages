import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { routes } from '../../lib/routes';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: Implement login logic
    console.log('Login attempt with:', { email, password });
  };

  return (
    <Animated.View 
      entering={FadeInUp.duration(1000)}
      style={styles.container}
    >
      <View style={styles.form}>
        <Input
          label="Email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          autoComplete="email"
          autoCorrect="off"
        />
        <Input
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Button onClick={handleLogin}>
          Log In
        </Button>
        <Link href={routes.auth.signup} asChild>
          <Button variant="outline">
            Create Account
          </Button>
        </Link>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  form: {
    width: '100%',
    maxWidth: 400,
    gap: 16,
  },
});
