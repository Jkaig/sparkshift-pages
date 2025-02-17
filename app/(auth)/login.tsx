import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, TextInput, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { routes } from '../../lib/routes';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = () => {
    // TODO: Implement login logic
    console.log('Login attempt with:', { email, password });
  };

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.form,
          {
            opacity: fadeAnim,
            transform: [{
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            }],
          },
        ]}
      >
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
        
        <Button onPress={handleLogin}>
          Log In
        </Button>
        
        <Link href={routes.auth.signup} asChild>
          <Button variant="outline">
            Create Account
          </Button>
        </Link>
      </Animated.View>
    </View>
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
