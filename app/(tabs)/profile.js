import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../components/context/AuthContext';

export default function ProfileScreen() {
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            // TabLayout will automatically redirect to language selection
          }
        }
      ]
    );
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-50">
      <Text className="text-xl font-bold text-gray-800 mb-8">Profile Screen</Text>
      
      {/* Logout Button */}
      <TouchableOpacity 
        className="bg-red-500 rounded-lg py-3 px-8"
        onPress={handleLogout}
      >
        <Text className="text-white text-center font-semibold text-lg">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}