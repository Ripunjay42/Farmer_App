import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthService } from '../../components/services/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { 
  useSharedValue, 
  withTiming, 
  useAnimatedStyle
} from 'react-native-reanimated';

export default function OTPLoginScreen() {
  const { role } = useLocalSearchParams();
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const formOpacity = useSharedValue(0);
  const otpOpacity = useSharedValue(0);

  useEffect(() => {
    formOpacity.value = withTiming(1, { duration: 600 });
  }, []);

  useEffect(() => {
    if (showOTPInput) {
      otpOpacity.value = withTiming(1, { duration: 400 });
      startTimer();
    }
  }, [showOTPInput]);

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const sendOTP = async () => {
    if (mobileNumber.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
      return;
    }

    setIsLoading(true);
    try {
      const data = await AuthService.sendOTP(mobileNumber, role);
      
      if (data.success) {
        setShowOTPInput(true);
        Alert.alert('Success', 'OTP sent successfully');
      } else {
        Alert.alert('Error', data.message || 'Failed to send OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
      console.error('Send OTP error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      const data = await AuthService.verifyOTP(mobileNumber, otp);
      
      if (data.success) {
        console.log('OTP verification successful:', data);
        // Store token and user data
        await AsyncStorage.setItem('authToken', data.token);
        await AsyncStorage.setItem('userRole', role);
        if (data.userData) {
          await AsyncStorage.setItem('userProfile', JSON.stringify(data.userData));
        }
        
        // Check if new user needs KYC
        console.log('User type check - isNewUser:', data.isNewUser);
        console.log('About to navigate to Aadhaar KYC');
        
        // For testing, always go to KYC first
        router.replace('/auth/aadhaar-kyc');
        
        /* Original logic - uncomment after testing
        if (data.isNewUser) {
          console.log('New user detected, navigating to Aadhaar KYC');
          router.replace('/auth/aadhaar-kyc');
        } else {
          console.log('Existing user, navigating to home');
          router.replace('/(tabs)/home');
        }
        */
      } else {
        Alert.alert('Error', data.message || 'Invalid OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
      console.error('Verify OTP error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = () => {
    setTimer(30);
    setCanResend(false);
    setOtp('');
    sendOTP();
  };

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: formOpacity.value,
    };
  });

  const otpAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: otpOpacity.value,
    };
  });

  const getRoleIcon = () => {
    return role === 'farmer' ? '👨‍🌾' : '🤝';
  };

  const getRoleColor = () => {
    return role === 'farmer' ? 'green' : 'blue';
  };

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="items-center pt-16 pb-8">
        <View className={`w-20 h-20 bg-${getRoleColor()}-100 rounded-full items-center justify-center mb-4`}>
          <Text className="text-4xl">{getRoleIcon()}</Text>
        </View>
        <Text className="text-2xl font-bold text-gray-800 mb-2">Verify Mobile Number</Text>
        <Text className="text-base text-gray-600 text-center px-6">
          We'll send you a verification code
        </Text>
      </View>

      {/* Form */}
      <Animated.View style={formAnimatedStyle} className="px-6">
        {/* Mobile Number Input */}
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">Mobile Number</Text>
          <View className="flex-row items-center">
            <View className="bg-white border border-gray-200 rounded-l-lg px-4 py-4">
              <Text className="text-gray-600 font-medium">+91</Text>
            </View>
            <TextInput
              className="flex-1 bg-white border border-gray-200 rounded-r-lg px-4 py-4 text-base"
              placeholder="Enter 10-digit mobile number"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="numeric"
              maxLength={10}
              editable={!showOTPInput}
            />
          </View>
          <Text className="text-blue-600 text-xs mt-1">
            💡 Test: Use any 10-digit number (9999999999 = existing user)
          </Text>
        </View>

        {/* Send OTP Button */}
        {!showOTPInput && (
          <TouchableOpacity
            className={`bg-${getRoleColor()}-500 rounded-lg py-4 mb-4 ${isLoading ? 'opacity-50' : ''}`}
            onPress={sendOTP}
            disabled={isLoading}
          >
            <Text className="text-white text-center font-semibold text-lg">
              {isLoading ? 'Sending...' : 'Send OTP'}
            </Text>
          </TouchableOpacity>
        )}

        {/* OTP Input Section */}
        {showOTPInput && (
          <Animated.View style={otpAnimatedStyle}>
            <View className="mb-6">
              <Text className="text-gray-700 font-medium mb-2">Enter OTP</Text>
              <TextInput
                className="bg-white border border-gray-200 rounded-lg px-4 py-4 text-base text-center tracking-widest"
                placeholder="000000"
                value={otp}
                onChangeText={setOtp}
                keyboardType="numeric"
                maxLength={6}
              />
              <Text className="text-blue-600 text-xs mt-1">
                💡 Test OTP: 123456
              </Text>
              <View className="flex-row justify-between items-center mt-2">
                <Text className="text-gray-500 text-sm">
                  Code sent to +91 {mobileNumber}
                </Text>
                {canResend ? (
                  <TouchableOpacity onPress={resendOTP}>
                    <Text className={`text-${getRoleColor()}-500 font-medium`}>Resend</Text>
                  </TouchableOpacity>
                ) : (
                  <Text className="text-gray-400 text-sm">Resend in {timer}s</Text>
                )}
              </View>
            </View>

            {/* Verify OTP Button */}
            <TouchableOpacity
              className={`bg-${getRoleColor()}-500 rounded-lg py-4 mb-4 ${isLoading ? 'opacity-50' : ''}`}
              onPress={verifyOTP}
              disabled={isLoading}
            >
              <Text className="text-white text-center font-semibold text-lg">
                {isLoading ? 'Verifying...' : 'Verify & Continue'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Back Button */}
        <TouchableOpacity
          className="py-3"
          onPress={() => router.back()}
        >
          <Text className="text-gray-500 text-center">Back to Role Selection</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}