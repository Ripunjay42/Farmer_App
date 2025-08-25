import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { KYCService } from '../../components/services/apiService';
import Animated, { 
  useSharedValue, 
  withTiming, 
  useAnimatedStyle
} from 'react-native-reanimated';

export default function AadhaarKYCScreen() {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const formOpacity = useSharedValue(0);
  const otpOpacity = useSharedValue(0);

  useEffect(() => {
    console.log('Aadhaar KYC screen loaded');
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

  const sendAadhaarOTP = async () => {
    if (aadhaarNumber.length !== 12) {
      Alert.alert('Error', 'Please enter a valid 12-digit Aadhaar number');
      return;
    }

    setIsLoading(true);
    try {
      const data = await KYCService.sendAadhaarOTP(aadhaarNumber);
      
      if (data.success) {
        setTransactionId(data.transactionId);
        setShowOTPInput(true);
        Alert.alert('Success', 'OTP sent to your Aadhaar-linked mobile number');
      } else {
        Alert.alert('Error', data.message || 'Failed to send OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
      console.error('Send Aadhaar OTP error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyAadhaarOTP = async () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      const data = await KYCService.verifyAadhaarOTP(transactionId, otp);
      
      if (data.success) {
        Alert.alert(
          'Success', 
          'Aadhaar verification completed successfully!',
          [
            {
              text: 'Continue',
              onPress: () => router.replace('/(tabs)/home')
            }
          ]
        );
      } else {
        Alert.alert('Error', data.message || 'Invalid OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
      console.error('Verify Aadhaar OTP error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = () => {
    setTimer(30);
    setCanResend(false);
    setOtp('');
    sendAadhaarOTP();
  };

  const skipKYC = () => {
    Alert.alert(
      'Skip eKYC',
      'You can complete your Aadhaar verification later from your profile. Some features may be limited.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Skip',
          onPress: () => router.replace('/(tabs)/home')
        }
      ]
    );
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

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="items-center pt-16 pb-8">
        <View className="w-20 h-20 bg-blue-100 rounded-full items-center justify-center mb-4">
          <Text className="text-4xl">🆔</Text>
        </View>
        <Text className="text-2xl font-bold text-gray-800 mb-2">Aadhaar eKYC</Text>
        <Text className="text-base text-gray-600 text-center px-6">
          Verify your identity with Aadhaar for secure access
        </Text>
      </View>

      {/* Form */}
      <Animated.View style={formAnimatedStyle} className="px-6">
        {/* Aadhaar Number Input */}
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">Aadhaar Number</Text>
          <TextInput
            className="bg-white border border-gray-200 rounded-lg px-4 py-4 text-base tracking-widest"
            placeholder="XXXX XXXX XXXX"
            value={aadhaarNumber}
            onChangeText={(text) => setAadhaarNumber(text.replace(/\s/g, ''))}
            keyboardType="numeric"
            maxLength={12}
            editable={!showOTPInput}
          />
          <Text className="text-gray-500 text-xs mt-1">
            Your Aadhaar details are encrypted and secure
          </Text>
          <Text className="text-blue-600 text-xs">
            💡 Test: Use any 12-digit number
          </Text>
        </View>

        {/* Send OTP Button */}
        {!showOTPInput && (
          <TouchableOpacity
            className={`bg-blue-500 rounded-lg py-4 mb-4 ${isLoading ? 'opacity-50' : ''}`}
            onPress={sendAadhaarOTP}
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
              <Text className="text-gray-700 font-medium mb-2">Enter Aadhaar OTP</Text>
              <TextInput
                className="bg-white border border-gray-200 rounded-lg px-4 py-4 text-base text-center tracking-widest"
                placeholder="000000"
                value={otp}
                onChangeText={setOtp}
                keyboardType="numeric"
                maxLength={6}
              />
              <Text className="text-blue-600 text-xs mt-1">
                💡 Test OTP: 654321
              </Text>
              <View className="flex-row justify-between items-center mt-2">
                <Text className="text-gray-500 text-sm">
                  OTP sent to Aadhaar-linked mobile
                </Text>
                {canResend ? (
                  <TouchableOpacity onPress={resendOTP}>
                    <Text className="text-blue-500 font-medium">Resend</Text>
                  </TouchableOpacity>
                ) : (
                  <Text className="text-gray-400 text-sm">Resend in {timer}s</Text>
                )}
              </View>
            </View>

            {/* Verify OTP Button */}
            <TouchableOpacity
              className={`bg-blue-500 rounded-lg py-4 mb-4 ${isLoading ? 'opacity-50' : ''}`}
              onPress={verifyAadhaarOTP}
              disabled={isLoading}
            >
              <Text className="text-white text-center font-semibold text-lg">
                {isLoading ? 'Verifying...' : 'Verify & Complete'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Alternative Options */}
        <View className="border-t border-gray-200 pt-6 mt-4">
          <Text className="text-gray-600 text-center mb-4">Alternative Options</Text>
          
          {/* Scan Aadhaar Card */}
          <TouchableOpacity className="bg-gray-100 rounded-lg py-3 mb-3">
            <Text className="text-gray-700 text-center font-medium">📷 Scan Aadhaar Card</Text>
          </TouchableOpacity>

          {/* Skip for now */}
          <TouchableOpacity onPress={skipKYC}>
            <Text className="text-gray-500 text-center">Skip for now</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Security Note */}
      <View className="px-6 pb-8">
        <View className="bg-blue-50 rounded-lg p-4">
          <Text className="text-blue-800 text-sm text-center">
            🔒 Your Aadhaar information is processed securely and used only for verification purposes
          </Text>
        </View>
      </View>
    </View>
  );
}