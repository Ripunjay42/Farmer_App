import { Stack } from 'expo-router';
import '../global.css';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding/screen1" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding/screen2" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding/screen3" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding/screen4" options={{ headerShown: false }} />
      <Stack.Screen name="auth/login" options={{ headerShown: false }} />
      <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}