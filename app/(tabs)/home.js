import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useFocusEffect } from 'expo-router';
import { useAuth } from '../../components/context/AuthContext';
import { FarmerService, ApplicationService } from '../../components/services/apiService';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import CustomButton from '../../components/ui/CustomButton';
import { FontAwesome } from '@expo/vector-icons';

export default function Home() {
  const { user } = useAuth();
  const [farmerProfile, setFarmerProfile] = useState(null);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Refresh data when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadDashboardData();
    }, [])
  );

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Load farmer profile
      const profileResponse = await FarmerService.getFarmerProfile();
      if (profileResponse.success) {
        setFarmerProfile(profileResponse.data);
      }

      // Try to load application status (might not exist for new users)
      const statusResponse = await ApplicationService.getApplicationStatus();
      if (statusResponse.success) {
        setApplicationStatus(statusResponse);
      } else {
        // No application found - this is expected for new users
        console.log('No application found - this is expected for new users');
        setApplicationStatus(null);
      }

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      Alert.alert('Error', 'Failed to load dashboard data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await loadDashboardData();
    setIsRefreshing(false);
  };

  const handleClaimLand = () => {
    router.push('/land/land-claiming');
  };

  const handleResetDemo = () => {
    Alert.alert(
      'Reset Demo Data',
      'This will reset the demo application status. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          onPress: async () => {
            // Reset the application status for demo purposes
            try {
              // Import and call reset function from API service
              const { ApplicationService } = await import('../../components/services/apiService');
              if (ApplicationService.resetDemoData) {
                ApplicationService.resetDemoData();
              }
              // Refresh the dashboard
              await loadDashboardData();
              Alert.alert('Success', 'Demo data has been reset.');
            } catch (error) {
              console.log('Reset demo data');
              await loadDashboardData();
            }
          }
        }
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'NOT_SUBMITTED':
        return 'text-orange-600';
      case 'SUBMITTED':
        return 'text-blue-600';
      case 'UNDER_REVIEW':
        return 'text-yellow-600';
      case 'APPROVED':
        return 'text-green-600';
      case 'REJECTED':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'NOT_SUBMITTED':
        return 'clock-o';
      case 'SUBMITTED':
        return 'paper-plane';
      case 'UNDER_REVIEW':
        return 'search';
      case 'APPROVED':
        return 'check-circle';
      case 'REJECTED':
        return 'times-circle';
      default:
        return 'question-circle';
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-green-50">
        <StatusBar style="dark" />
        <LoadingSpinner size="large" color="#10b981" />
      </View>
    );
  }

  return (
    <ScrollView 
      className="flex-1 bg-green-50"
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    >
      <StatusBar style="dark" />
      
      {/* Header Section */}
      <View className="bg-green-500 pt-14 pb-5 px-6 rounded-b-2xl">
        <View className="flex-row items-center mb-4">
          <View className="w-16 h-16 bg-white rounded-full items-center justify-center mr-4">
            <Text className="text-green-500 text-2xl">🌾</Text>
          </View>
          <View className="flex-1">
            <Text className="text-white text-lg font-semibold">Welcome back!</Text>
            <Text className="text-green-100 text-2xl font-bold">
              {farmerProfile?.name || user?.name || 'Farmer'}
            </Text>
          </View>
        </View>
      </View>

      {/* Content */}
      <View className="px-6 py-6">

        
      {/* Quick Stats */}
        <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <Text className="text-lg font-bold text-gray-800 mb-4">Your Profile</Text>
          
          <View className="space-y-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-600">Mobile Number:</Text>
              <Text className="font-semibold text-gray-800">
                {farmerProfile?.mobile || user?.mobile}
              </Text>
            </View>
            
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-600">Father's Name:</Text>
              <Text className="font-semibold text-gray-800">
                {farmerProfile?.fatherName || 'Not Available'}
              </Text>
            </View>
            
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-600">KYC Status:</Text>
              <View className="flex-row items-center">
                <FontAwesome 
                  name={farmerProfile?.hasCompletedKYC ? "check-circle" : "times-circle"} 
                  size={16} 
                  color={farmerProfile?.hasCompletedKYC ? "#10b981" : "#ef4444"} 
                />
                <Text className={`ml-2 font-semibold ${farmerProfile?.hasCompletedKYC ? 'text-green-600' : 'text-red-600'}`}>
                  {farmerProfile?.hasCompletedKYC ? 'Completed' : 'Pending'}
                </Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Application Status Card */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100 mt-4">
          <View className="flex-row items-center mb-4">
            <FontAwesome 
              name={getStatusIcon(applicationStatus?.status || farmerProfile?.applicationStatus)} 
              size={24} 
              color="#10b981" 
            />
            <Text className="text-lg font-bold text-gray-800 ml-3">Application Status</Text>
          </View>
          
          {applicationStatus ? (
            <View>
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-gray-600">Status:</Text>
                <Text className={`font-semibold ${getStatusColor(applicationStatus.status)}`}>
                  {applicationStatus.status.replace('_', ' ')}
                </Text>
              </View>
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-gray-600">Application ID:</Text>
                <Text className="font-mono text-sm text-gray-800">
                  {applicationStatus.applicationId}
                </Text>
              </View>
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-gray-600">Total Lands:</Text>
                <Text className="font-semibold text-gray-800">
                  {applicationStatus.totalLands}
                </Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-gray-600">Submitted:</Text>
                <Text className="text-gray-800">
                  {applicationStatus.submittedDate}
                </Text>
              </View>
            </View>
          ) : (
            <View className="items-center py-4">
              <Text className={`text-lg font-semibold ${getStatusColor(farmerProfile?.applicationStatus)}`}>
                {farmerProfile?.applicationStatus?.replace('_', ' ') || 'Not Submitted'}
              </Text>
              <Text className="text-gray-500 text-center mt-2">
                You haven't submitted any land claim application yet.
              </Text>
            </View>
          )}
        </View>

        {/* Main Action Button */}
        <CustomButton
          title={applicationStatus ? "View/Update Land Claim" : "Claim Your Land"}
          onPress={handleClaimLand}
          variant={applicationStatus ? "outline" : "primary"}
          icon={<FontAwesome name="map-marker" size={20} color={applicationStatus ? "#10b981" : "white"} />}
          className="mb-6"
        />

        {/* Help Section */}
        {/* <View className="bg-blue-50 rounded-2xl p-6 mt-6 border border-blue-100">
          <View className="flex-row items-center mb-3">
            <FontAwesome name="info-circle" size={20} color="#3b82f6" />
            <Text className="text-lg font-semibold text-blue-800 ml-2">Need Help?</Text>
          </View>
          <Text className="text-blue-700 leading-6">
            If you need assistance with land claiming or have questions about the process, 
            please contact our support team or visit the nearest government office.
          </Text>
        </View> */}
      </View>
    </ScrollView>
  );
}