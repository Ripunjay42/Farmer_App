import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  // Authentication token management
  static async setAuthToken(token) {
    try {
      await AsyncStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Error saving auth token:', error);
    }
  }

  static async getAuthToken() {
    try {
      return await AsyncStorage.getItem('authToken');
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  }

  static async removeAuthToken() {
    try {
      await AsyncStorage.removeItem('authToken');
    } catch (error) {
      console.error('Error removing auth token:', error);
    }
  }

  // User role management
  static async setUserRole(role) {
    try {
      await AsyncStorage.setItem('userRole', role);
    } catch (error) {
      console.error('Error saving user role:', error);
    }
  }

  static async getUserRole() {
    try {
      return await AsyncStorage.getItem('userRole');
    } catch (error) {
      console.error('Error getting user role:', error);
      return null;
    }
  }

  // User profile data
  static async setUserProfile(profile) {
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  }

  static async getUserProfile() {
    try {
      const profile = await AsyncStorage.getItem('userProfile');
      return profile ? JSON.parse(profile) : null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  }

  // Language preference
  static async setLanguage(language) {
    try {
      await AsyncStorage.setItem('selectedLanguage', language);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  }

  static async getLanguage() {
    try {
      return await AsyncStorage.getItem('selectedLanguage');
    } catch (error) {
      console.error('Error getting language:', error);
      return 'en'; // Default to English
    }
  }

  // Clear all user data (for logout)
  static async clearUserData() {
    try {
      await AsyncStorage.multiRemove([
        'authToken',
        'userRole',
        'userProfile'
      ]);
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  }

  // Check if user is authenticated
  static async isAuthenticated() {
    try {
      const token = await AsyncStorage.getItem('authToken');
      return !!token;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }

  // Check if user has completed onboarding
  static async hasCompletedOnboarding() {
    try {
      const completed = await AsyncStorage.getItem('onboardingCompleted');
      return completed === 'true';
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      return false;
    }
  }

  static async setOnboardingCompleted() {
    try {
      await AsyncStorage.setItem('onboardingCompleted', 'true');
    } catch (error) {
      console.error('Error setting onboarding completed:', error);
    }
  }
}

export default StorageService;