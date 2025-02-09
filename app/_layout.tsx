import { Slot, Stack } from 'expo-router';
import { useEffect } from 'react';
import { LogBox } from 'react-native';
import { ThemeProvider } from '@react-navigation/native';

const theme = {
  dark: false,
  colors: {
    primary: '#007AFF',
    background: '#ffffff',
    card: '#ffffff',
    text: '#000000',
    border: '#cccccc',
    notification: '#ff3b30',
  },
  fonts: {
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    bold: {
      fontFamily: 'System',
      fontWeight: '700',
    },
  },
};

export default function RootLayout() {
  useEffect(() => {
    LogBox.ignoreLogs(['Async Storage has been extracted from react-native core']);
  }, []);

  return (
    <ThemeProvider value={theme}>
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          contentStyle: { backgroundColor: '#fff' },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'SparkShift',
          }}
        />
        <Stack.Screen
          name="(auth)/login"
          options={{
            title: 'Login',
          }}
        />
        <Stack.Screen
          name="pricing"
          options={{
            title: 'Pricing',
          }}
        />
        <Stack.Screen
          name="resources"
          options={{
            title: 'Resources',
          }}
        />
        <Stack.Screen
          name="contact"
          options={{
            title: 'Contact',
          }}
        />
        <Stack.Screen
          name="review"
          options={{
            title: 'Review',
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
