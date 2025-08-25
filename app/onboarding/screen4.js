import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../components/context/AuthContext';
import Animated, { 
  useSharedValue, 
  withTiming, 
  useAnimatedStyle
} from 'react-native-reanimated';

export default function OnboardingScreen4() {
  const { completeOnboarding } = useAuth();
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(100);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
    translateX.value = withTiming(0, { duration: 300 });
  }, []);

  const handleBack = () => {
      setTimeout(() => router.push('/onboarding/screen3'), 100);
       opacity.value = withTiming(100, { duration: 100 });
       translateX.value = withTiming(0, { duration: 100 });
  };

  const handleGetStarted = async () => {
    opacity.value = withTiming(100, { duration: 100 });
    translateX.value = withTiming(0, { duration: 100 });
    
    // Mark onboarding as completed
    await completeOnboarding();
    
    setTimeout(() => router.push('/role-selection'), 100);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateX: translateX.value }
      ],
    };
  });

  return (
    <View className="flex-1 bg-gray-100">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="flex-row justify-between items-center p-6 pt-14">
        <View />
        <TouchableOpacity onPress={() => router.replace('/role-selection')}>
          <Text className="text-gray-600 text-md">Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <Animated.View style={animatedStyle} className="flex-1 items-center px-2">
        {/* Illustration */}
        <View className="mb-2">
          <Image 
            // source={require('../../assets/screen4.png')}
            className="w-64 h-64"
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Text className="text-2xl font-bold text-gray-800 text-center mb-4">
          Improve agriculture{'\n'}precision
        </Text>

        {/* Description */}
        <Text className="text-gray-500 text-center text-md leading-6 mb-10 max-w-xs">
          we will use satellite imagery, image
          processing, deep learning, computer
          vision, and remote sensing to detect
          changes in the field and crops and solve
          the problems whenever they pop.
        </Text>

        {/* Progress Dots */}
        <View className="flex-row mb-8">
          <View className="w-8 h-2 bg-gray-300 rounded-full mr-2"></View>
          <View className="w-8 h-2 bg-gray-300 rounded-full mr-2"></View>
          <View className="w-8 h-2 bg-gray-300 rounded-full mr-2"></View>
          <View className="w-8 h-2 bg-green-500 rounded-full"></View>
        </View>

        {/* Navigation Buttons */}
        <View className="flex-row justify-between w-full px-10">
          <TouchableOpacity 
            className="py-3 px-6"
            onPress={handleBack}
          >
            <Text className="text-gray-400 text-md">Back</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="bg-green-500 py-3 px-8 rounded-lg"
            onPress={handleGetStarted}
          >
            <Text className="text-white font-semibold text-md">Get Started</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}