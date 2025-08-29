import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../../components/context/AuthContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

function ProtectedTabs() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#10b981',
        tabBarInactiveTintColor: '#6b7280',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome size={size} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome size={size} name="cog" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome size={size} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    console.log('TabLayout: Auth state changed:', { isLoading, isAuthenticated });
    
    // Don't redirect while loading
    if (isLoading) {
      return;
    }

    // If not authenticated, redirect to language selection
    if (!isAuthenticated) {
      console.log('TabLayout: User not authenticated, redirecting to language selection');
      router.replace('/screens/language-selection');
      return;
    }

    console.log('TabLayout: User authenticated, showing tabs');
  }, [isLoading, isAuthenticated]);

  // Show loading while auth is being checked
  if (isLoading) {
    return (
      <View className="flex-1 bg-green-50 justify-center items-center">
        <View className="w-20 h-20 bg-green-500 rounded-full items-center justify-center mb-6">
          <Text className="text-white text-3xl">🌾</Text>
        </View>
        <Text className="text-xl font-semibold text-green-800 mb-4">FarmApp</Text>
        <LoadingSpinner size="large" color="#10b981" />
      </View>
    );
  }

  // Show empty view if not authenticated (will redirect)
  if (!isAuthenticated) {
    return (
      <View className="flex-1 bg-green-50 justify-center items-center">
        <Text className="text-green-600">Redirecting...</Text>
      </View>
    );
  }

  // Show tabs only if authenticated
  return <ProtectedTabs />;
}