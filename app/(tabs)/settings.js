import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Settings() {

  return (
   <View className="flex-1 justify-center items-center bg-gray-50">
         <Text className="text-xl font-bold text-gray-800">Settings screen</Text>
      </View>
  );
}