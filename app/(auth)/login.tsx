import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
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
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button onPress={handleLogin}>
          Log In
        </Button>
        <Link href="/signup" asChild>
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
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  form: {
    width: '100%',
    maxWidth: 400,
    gap: 16,
  },
});
