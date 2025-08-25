import { Stack } from 'expo-router';
import '../global.css';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="splash" options={{ headerShown: false }} />
      <Stack.Screen name="language-selection" options={{ headerShown: false }} />
      {/* <Stack.Screen name="test-info" options={{ headerShown: false }} /> */}
      <Stack.Screen name="role-selection" options={{ headerShown: false }} />
      <Stack.Screen name="auth/otp-login" options={{ headerShown: false }} />
      <Stack.Screen name="auth/aadhaar-kyc" options={{ headerShown: false }} />
      <Stack.Screen name="auth/login" options={{ headerShown: false }} />
      <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}