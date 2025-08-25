import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';

const GoogleIcon = ({ size = 25 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <Path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <Path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <Path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </Svg>
);

export default function SignupScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = () => {
    // Add signup logic here
    router.replace('/(tabs)/home');
  };

  return (
    <View className="flex-1 bg-gray-950">
      <StatusBar style="light" />
      
      {/* Background with plant image overlay */}
      <View className="flex-1 bg-black/20">
        {/* Header */}
        <View className="items-center pt-16 pb-6">
          <Text className="text-white text-2xl font-bold mb-2">Sign Up</Text>
          <Text className="text-white/80 text-base">create an account to continue</Text>
        </View>

        {/* Signup Form */}
        <View className="bg-white/10 backdrop-blur-lg mx-4 rounded-3xl p-6">
          {/* First Name Input */}
          <View className="mb-4">
            <View className="flex-row items-center bg-white/20 rounded-lg px-4 py-3">
              <Text className="text-white/70 mr-3">👤</Text>
              <TextInput
                className="flex-1 text-white text-base"
                placeholder="First Name"
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
          </View>

          {/* Last Name Input */}
          <View className="mb-4">
            <View className="flex-row items-center bg-white/20 rounded-lg px-4 py-3">
              <Text className="text-white/70 mr-3">👤</Text>
              <TextInput
                className="flex-1 text-white text-base"
                placeholder="Last Name"
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>

          {/* Phone Number Input */}
          <View className="mb-4">
            <View className="flex-row items-center bg-white/20 rounded-lg px-4 py-3">
              <Text className="text-white/70 mr-3">📱</Text>
              <TextInput
                className="flex-1 text-white text-base"
                placeholder="Phone Number"
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Password Input */}
          <View className="mb-4">
            <View className="flex-row items-center bg-white/20 rounded-lg px-4 py-3">
              <Text className="text-white/70 mr-3">🔒</Text>
              <TextInput
                className="flex-1 text-white text-base"
                placeholder="password"
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text className="text-white/70 text-xl">{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password Input */}
          <View className="mb-6">
            <View className="flex-row items-center bg-white/20 rounded-lg px-4 py-3">
              <Text className="text-white/70 mr-3">🔒</Text>
              <TextInput
                className="flex-1 text-white text-base"
                placeholder="Confirm password"
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Text className="text-white/70 text-xl">{showConfirmPassword ? '👁️' : '👁️‍🗨️'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity 
            className="bg-green-500 rounded-lg py-4 mb-6"
            onPress={handleSignup}
          >
            <Text className="text-white text-center font-semibold text-lg">Sign Up</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-white/30" />
            <Text className="text-white/70 mx-4 text-sm">or sign up with</Text>
            <View className="flex-1 h-px bg-white/30" />
          </View>

          {/* Social Login */}
         <View className="flex-row justify-center mb-8">
            <TouchableOpacity className="w-14 h-14 bg-blue-600 rounded-full items-center justify-center mr-4">
                 <FontAwesome name="facebook-f" size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="w-14 h-14 bg-white rounded-full items-center justify-center ml-4 border border-gray-200">
                <GoogleIcon size={25} />
            </TouchableOpacity>
         </View>

          {/* Login Link */}
          <View className="flex-row justify-center mb-4">
            <Text className="text-white/70 text-sm">Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
              <Text className="text-white font-semibold text-sm underline">log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}