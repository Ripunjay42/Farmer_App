import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function TestInfoScreen() {
  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="bg-blue-500 pt-12 pb-6 px-6">
        <Text className="text-white text-2xl font-bold mb-2">🧪 Test Mode</Text>
        <Text className="text-blue-100">Dummy API credentials for testing</Text>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-6 py-6">
        <View className="bg-white rounded-lg p-6 mb-4 shadow-sm">
          <Text className="text-lg font-bold text-gray-800 mb-4">📱 Mobile OTP Testing</Text>
          <View className="bg-green-50 p-4 rounded-lg mb-2">
            <Text className="text-green-800 font-medium">Use OTP: 123456</Text>
            <Text className="text-green-600 text-sm">For any mobile number</Text>
          </View>
          <Text className="text-gray-600 text-sm">
            • Any 10-digit mobile number will work{'\n'}
            • Use mobile number 9999999999 to simulate existing user{'\n'}
            • Any other number will be treated as new user
          </Text>
        </View>

        <View className="bg-white rounded-lg p-6 mb-4 shadow-sm">
          <Text className="text-lg font-bold text-gray-800 mb-4">🆔 Aadhaar KYC Testing</Text>
          <View className="bg-blue-50 p-4 rounded-lg mb-2">
            <Text className="text-blue-800 font-medium">Use OTP: 654321</Text>
            <Text className="text-blue-600 text-sm">For any Aadhaar number</Text>
          </View>
          <Text className="text-gray-600 text-sm">
            • Any 12-digit Aadhaar number will work{'\n'}
            • Mock user data will be returned{'\n'}
            • Both OTPs have simulated network delays
          </Text>
        </View>

        <View className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <Text className="text-yellow-800 font-medium mb-2">⚠️ Note</Text>
          <Text className="text-yellow-700 text-sm">
            This is dummy data for testing purposes only. In production, real APIs and UIDAI integration will be used.
          </Text>
        </View>

        <TouchableOpacity 
          className="bg-green-500 rounded-lg py-4 mb-4"
          onPress={() => router.replace('/role-selection')}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Continue to App
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="py-3"
          onPress={() => router.back()}
        >
          <Text className="text-gray-500 text-center">Go Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}