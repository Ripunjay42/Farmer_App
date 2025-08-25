import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Animated, { 
  useSharedValue, 
  withTiming, 
  useAnimatedStyle,
  withSequence
} from 'react-native-reanimated';

export default function SplashScreen() {
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);

  useEffect(() => {
    // Animate logo first
    logoScale.value = withSequence(
      withTiming(1.2, { duration: 800 }),
      withTiming(1, { duration: 200 })
    );
    logoOpacity.value = withTiming(1, { duration: 800 });

    // Navigate to onboarding after animation
    setTimeout(() => {
      router.replace('screens/language-selection');
    }, 2500);
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: logoScale.value }],
      opacity: logoOpacity.value,
    };
  });

  return (
    <View className="flex-1 bg-green-50">
      <StatusBar style="dark" />
      
      {/* Logo Section */}
      <View className="flex-1 justify-center items-center">
        <Animated.View style={logoAnimatedStyle} className="items-center">
          <View className="w-32 h-32 bg-green-500 rounded-full items-center justify-center mb-6 shadow-lg">
            <Text className="text-white text-5xl">🌾</Text>
          </View>
          <Text className="text-3xl font-bold text-green-800 mb-2">FarmApp</Text>
          <Text className="text-lg text-green-600">Your Agricultural Companion</Text>
        </Animated.View>
      </View>
    </View>
  );
}