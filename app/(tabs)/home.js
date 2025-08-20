import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Home() {
  const farmStats = [
    { label: 'Total Crops', value: '25', icon: '🌾' },
    { label: 'Today\'s Harvest', value: '8.5 kg', icon: '⚖️' },
    { label: 'Weather', value: 'Sunny', icon: '☀️' },
    { label: 'Temperature', value: '28°C', icon: '🌡️' },
  ];

  const quickActions = [
    { title: 'Add New Crop', icon: '🌱', color: 'bg-green-500' },
    { title: 'Record Harvest', icon: '📝', color: 'bg-blue-500' },
    { title: 'Check Weather', icon: '🌤️', color: 'bg-orange-500' },
    { title: 'Market Prices', icon: '💰', color: 'bg-purple-500' },
  ];

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <ScrollView className="flex-1 bg-gray-50">
        {/* Welcome Section */}
        <View className="bg-green-600 p-6 pb-8">
          <Text className="text-white text-2xl font-bold mb-2">
            Welcome back, Farmer! 👨‍🌾
          </Text>
          <Text className="text-green-100 text-lg">
            Here's your farm overview for today
          </Text>
        </View>

        {/* Farm Stats */}
        <View className="px-4 -mt-4">
          <View className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <Text className="text-gray-800 text-lg font-semibold mb-4">
              Farm Statistics
            </Text>
            <View className="flex-row flex-wrap">
              {farmStats.map((stat, index) => (
                <View key={index} className="w-1/2 p-2">
                  <View className="bg-gray-50 rounded-lg p-4 items-center">
                    <Text className="text-2xl mb-2">{stat.icon}</Text>
                    <Text className="text-gray-600 text-sm mb-1">
                      {stat.label}
                    </Text>
                    <Text className="text-gray-800 text-lg font-bold">
                      {stat.value}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-4 mb-6">
          <Text className="text-gray-800 text-lg font-semibold mb-4">
            Quick Actions
          </Text>
          <View className="flex-row flex-wrap">
            {quickActions.map((action, index) => (
              <View key={index} className="w-1/2 p-2">
                <TouchableOpacity 
                  className={`${action.color} rounded-lg p-4 items-center shadow-sm`}
                  activeOpacity={0.7}
                >
                  <Text className="text-3xl mb-2">{action.icon}</Text>
                  <Text className="text-white font-semibold text-center">
                    {action.title}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View className="px-4 mb-6">
          <Text className="text-gray-800 text-lg font-semibold mb-4">
            Recent Activity
          </Text>
          <View className="bg-white rounded-lg shadow-sm">
            {[
              { activity: 'Watered tomato plants', time: '2 hours ago', icon: '💧' },
              { activity: 'Harvested carrots', time: '5 hours ago', icon: '🥕' },
              { activity: 'Applied fertilizer', time: 'Yesterday', icon: '🌱' },
            ].map((item, index) => (
              <View key={index} className="flex-row items-center p-4 border-b border-gray-100">
                <Text className="text-2xl mr-3">{item.icon}</Text>
                <View className="flex-1">
                  <Text className="text-gray-800 font-medium">{item.activity}</Text>
                  <Text className="text-gray-500 text-sm">{item.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}