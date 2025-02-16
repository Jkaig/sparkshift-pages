import { Stack } from 'expo-router/stack';
import { AuthProvider } from './lib/providers/AuthProvider';
import { ThemeProvider } from './lib/providers/ThemeProvider';
import { View, Text } from 'react-native';

function ErrorBoundary({ error }: { error: Error }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>An error occurred: {error.message}</Text>
    </View>
  );
}

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(auth)" />
          </Stack>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}