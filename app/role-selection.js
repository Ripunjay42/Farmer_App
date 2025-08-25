import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Animated, { 
  useSharedValue, 
  withTiming, 
  useAnimatedStyle,
  withSpring
} from 'react-native-reanimated';

export default function RoleSelectionScreen() {
  const farmerScale = useSharedValue(0);
  const sahayakScale = useSharedValue(0);
  const titleOpacity = useSharedValue(0);

  useEffect(() => {
    titleOpacity.value = withTiming(1, { duration: 600 });
    
    setTimeout(() => {
      farmerScale.value = withSpring(1, { damping: 15 });
    }, 300);
    
    setTimeout(() => {
      sahayakScale.value = withSpring(1, { damping: 15 });
    }, 500);
  }, []);

  const handleRoleSelect = (role) => {
    router.push(`/auth/otp-login?role=${role}`);
  };

  const titleAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: titleOpacity.value,
    };
  });

  const farmerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: farmerScale.value }],
    };
  });

  const sahayakAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: sahayakScale.value }],
    };
  });

  return (
    <View className="flex-1 bg-green-50">
      <StatusBar style="dark" />
      
      {/* Header */}
      <Animated.View style={titleAnimatedStyle} className="items-center pt-20 pb-8">
        <View className="w-20 h-20 bg-green-500 rounded-full items-center justify-center mb-6">
          <Text className="text-white text-3xl">🌾</Text>
        </View>
        <Text className="text-2xl font-bold text-green-800 mb-2">Welcome to FarmApp</Text>
        <Text className="text-base text-green-600 text-center px-6">
          Choose your role to get started with personalized features
        </Text>
      </Animated.View>

      {/* Role Selection Cards */}
      <View className="flex-1 justify-center px-6 space-y-6">
        {/* Farmer Option */}
        <Animated.View style={farmerAnimatedStyle}>
          <TouchableOpacity
            className="bg-white rounded-2xl p-8 shadow-lg border border-green-100"
            onPress={() => handleRoleSelect('farmer')}
          >
            <View className="items-center">
              <View className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-4">
                <Text className="text-4xl">👨‍🌾</Text>
              </View>
              <Text className="text-2xl font-bold text-green-800 mb-2">I am a Farmer</Text>
              <Text className="text-green-600 text-center leading-5">
                Access tools for crop management, market prices, weather updates, and sell your produce directly
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Sahayak Option */}
        <Animated.View style={sahayakAnimatedStyle}>
          <TouchableOpacity
            className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100"
            onPress={() => handleRoleSelect('sahayak')}
          >
            <View className="items-center">
              <View className="w-20 h-20 bg-blue-100 rounded-full items-center justify-center mb-4">
                <Text className="text-4xl">🤝</Text>
              </View>
              <Text className="text-2xl font-bold text-blue-800 mb-2">I am a Sahayak</Text>
              <Text className="text-blue-600 text-center leading-5">
                Help farmers with agricultural guidance, technical support, and bridge the digital gap
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Footer */}
      <View className="pb-8 px-6">
        <Text className="text-center text-green-500 text-sm">
          You can change your role later in settings
        </Text>
      </View>
    </View>
  );
}