import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#16a34a',
        tabBarInactiveTintColor: '#6b7280',
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
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>🏠</Text>,
          headerTitle: 'Farmer Dashboard',
          headerStyle: { backgroundColor: '#16a34a' },
          headerTitleStyle: { color: '#ffffff' },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>⚙️</Text>,
          headerTitle: 'App Settings',
          headerStyle: { backgroundColor: '#16a34a' },
          headerTitleStyle: { color: '#ffffff' },
        }}
      />
    </Tabs>
  );
}