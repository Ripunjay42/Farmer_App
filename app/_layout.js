import { Stack } from 'expo-router';
import { AuthProvider } from '../components/context/AuthContext';
import '../global.css';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="language-selection" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding/screen1" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding/screen2" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding/screen3" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding/screen4" options={{ headerShown: false }} />
        <Stack.Screen name="role-selection" options={{ headerShown: false }} />
        <Stack.Screen name="auth/otp-login" options={{ headerShown: false }} />
        <Stack.Screen name="auth/aadhaar-kyc" options={{ headerShown: false }} />
        <Stack.Screen name="auth/login" options={{ headerShown: false }} />
        <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}