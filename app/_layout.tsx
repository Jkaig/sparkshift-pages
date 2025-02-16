import { Stack } from 'expo-router/stack';
import { AuthProvider } from '../lib/providers/AuthProvider';
import { ThemeProvider } from '../lib/providers/ThemeProvider';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}