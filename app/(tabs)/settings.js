import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Settings() {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  const settingsOptions = [
    { title: 'Profile Settings', icon: '👤', color: 'bg-blue-500' },
    { title: 'Farm Management', icon: '🚜', color: 'bg-green-500' },
    { title: 'Data Backup', icon: '☁️', color: 'bg-purple-500' },
    { title: 'Help & Support', icon: '❓', color: 'bg-orange-500' },
  ];

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <ScrollView className="flex-1 bg-gray-50">
        {/* Header */}
        <View className="bg-green-600 p-6">
          <Text className="text-white text-2xl font-bold mb-2">
            Settings ⚙️
          </Text>
          <Text className="text-green-100 text-lg">
            Customize your farming experience
          </Text>
        </View>

        {/* Preferences */}
        <View className="px-4 mt-6">
          <Text className="text-gray-800 text-lg font-semibold mb-4">
            Preferences
          </Text>
          <View className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
              <View className="flex-row items-center">
                <Text className="text-xl mr-3">🔔</Text>
                <Text className="text-gray-800 font-medium">Notifications</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#d1d5db', true: '#16a34a' }}
                thumbColor={notifications ? '#ffffff' : '#f3f4f6'}
              />
            </View>
            
            <View className="flex-row items-center justify-between py-3">
              <View className="flex-row items-center">
                <Text className="text-xl mr-3">🌙</Text>
                <Text className="text-gray-800 font-medium">Dark Mode</Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#d1d5db', true: '#16a34a' }}
                thumbColor={darkMode ? '#ffffff' : '#f3f4f6'}
              />
            </View>
          </View>
        </View>

        {/* Settings Options */}
        <View className="px-4 mb-6">
          <Text className="text-gray-800 text-lg font-semibold mb-4">
            Options
          </Text>
          <View className="bg-white rounded-lg shadow-sm">
            {settingsOptions.map((option, index) => (
              <TouchableOpacity 
                key={index} 
                className="flex-row items-center p-4 border-b border-gray-100"
                activeOpacity={0.7}
              >
                <View className={`${option.color} rounded-lg p-2 mr-4`}>
                  <Text className="text-white text-lg">{option.icon}</Text>
                </View>
                <Text className="text-gray-800 font-medium flex-1">
                  {option.title}
                </Text>
                <Text className="text-gray-400 text-lg">›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* App Info */}
        <View className="px-4 mb-6">
          <Text className="text-gray-800 text-lg font-semibold mb-4">
            About
          </Text>
          <View className="bg-white rounded-lg shadow-sm p-4">
            <View className="items-center py-4">
              <Text className="text-4xl mb-2">🚜</Text>
              <Text className="text-gray-800 text-lg font-semibold">
                Farmer App
              </Text>
              <Text className="text-gray-500 text-sm">Version 1.0.0</Text>
              <Text className="text-gray-500 text-xs mt-2 text-center">
                Your digital farming companion for managing crops and harvests
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}