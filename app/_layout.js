import { Stack } from 'expo-router';
import '../global.css';
import { AuthProvider } from '../components/context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="screens/splash" options={{ headerShown: false }} />
        <Stack.Screen name="screens/language-selection" options={{ headerShown: false }} />
        {/* <Stack.Screen name="test-info" options={{ headerShown: false }} /> */}
        <Stack.Screen name="screens/role-selection" options={{ headerShown: false }} />
        <Stack.Screen name="auth/otp-login" options={{ headerShown: false }} />
        <Stack.Screen name="auth/aadhaar-kyc" options={{ headerShown: false }} />
        <Stack.Screen name="auth/login" options={{ headerShown: false }} />
        <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="land/land-claiming" options={{ headerShown: false }} />
        <Stack.Screen name="land/add-land-manually" options={{ headerShown: false }} />
        <Stack.Screen name="land/map-view" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}