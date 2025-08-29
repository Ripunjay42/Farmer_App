// Dummy API service for testing without real backend

// Dummy user database for testing
const DUMMY_USERS = {
  '9999999999': {
    name: 'Existing User',
    mobile: '9999999999',
    role: 'farmer',
    hasCompletedKYC: true,
    registrationDate: '2024-01-01'
  },
  '8888888888': {
    name: 'Another User',
    mobile: '8888888888', 
    role: 'sahayak',
    hasCompletedKYC: false,
    registrationDate: '2024-02-01'
  }
};

class AuthService {
  static async checkUserExists(mobileNumber) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = DUMMY_USERS[mobileNumber];
      return {
        exists: !!user,
        userData: user || null
      };
    } catch (error) {
      console.error('Check user exists error:', error);
      throw error;
    }
  }

  static async sendOTP(mobileNumber, role) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Dummy response - always success
      return {
        success: true,
        message: 'OTP sent successfully'
      };
    } catch (error) {
      console.error('Send OTP error:', error);
      throw error;
    }
  }

  static async verifyOTP(mobileNumber, otp) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Dummy verification logic
      if (otp === '123456') {
        const existingUser = DUMMY_USERS[mobileNumber];
        return {
          success: true,
          token: 'dummy_jwt_token_' + Date.now(),
          isNewUser: !existingUser,
          userData: existingUser || {
            name: 'New User',
            mobile: mobileNumber
          }
        };
      } else {
        return {
          success: false,
          message: 'Invalid OTP. Use 123456 for testing'
        };
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      throw error;
    }
  }
}

class KYCService {
  static async sendAadhaarOTP(aadhaarNumber) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Dummy response - always success
      return {
        success: true,
        transactionId: 'dummy_txn_' + Date.now(),
        message: 'Aadhaar OTP sent successfully'
      };
    } catch (error) {
      console.error('Send Aadhaar OTP error:', error);
      throw error;
    }
  }

  static async verifyAadhaarOTP(transactionId, otp) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Dummy verification logic
      if (otp === '654321') {
        return {
          success: true,
          userData: {
            name: 'John Doe',
            fatherName: 'Father Name',
            address: '123 Test Street, Test City, Test State - 123456',
            aadhaarNumber: '************1234'
          }
        };
      } else {
        return {
          success: false,
          message: 'Invalid Aadhaar OTP. Use 654321 for testing'
        };
      }
    } catch (error) {
      console.error('Verify Aadhaar OTP error:', error);
      throw error;
    }
  }
}

// Dummy land data for testing
const DUMMY_LAND_BUCKETS = [
  {
    bucketId: 'bucket_1',
    village: 'Kadaganchi',
    tehsil: 'Haveri',
    district: 'Haveri',
    surveyNo: '123/4',
    area: '2.5 acres',
    ownerName: 'John Doe',
    landType: 'Agricultural',
    geoJson: {
      type: 'Polygon',
      coordinates: [[[75.1230, 14.4560], [75.1240, 14.4560], [75.1240, 14.4570], [75.1230, 14.4570], [75.1230, 14.4560]]]
    }
  },
  {
    bucketId: 'bucket_2',
    village: 'Bellur',
    tehsil: 'Haveri', 
    district: 'Haveri',
    surveyNo: '456/7',
    area: '3.2 acres',
    ownerName: 'John Doe',
    landType: 'Agricultural',
    geoJson: {
      type: 'Polygon',
      coordinates: [[[75.1250, 14.4580], [75.1270, 14.4580], [75.1270, 14.4600], [75.1250, 14.4600], [75.1250, 14.4580]]]
    }
  },
  {
    bucketId: 'bucket_3',
    village: 'Honnali',
    tehsil: 'Honnali',
    district: 'Davangere',
    surveyNo: '789/1',
    area: '1.8 acres',
    ownerName: 'John Doe',
    landType: 'Agricultural',
    geoJson: {
      type: 'Polygon',
      coordinates: [[[75.1300, 14.4620], [75.1315, 14.4620], [75.1315, 14.4635], [75.1300, 14.4635], [75.1300, 14.4620]]]
    }
  }
];

const DUMMY_LAND_SEARCH_RESULTS = {
  '123/4': {
    landId: 'land_123_4',
    village: 'Kadaganchi',
    tehsil: 'Haveri',
    district: 'Haveri',
    surveyNo: '123/4',
    ownerName: 'John Doe',
    area: '2.5 acres',
    landType: 'Agricultural',
    geoJson: {
      type: 'Polygon',
      coordinates: [[[75.1230, 14.4560], [75.1240, 14.4560], [75.1240, 14.4570], [75.1230, 14.4570], [75.1230, 14.4560]]]
    }
  },
  '456/7': {
    landId: 'land_456_7',
    village: 'Bellur',
    tehsil: 'Haveri',
    district: 'Haveri',
    surveyNo: '456/7',
    ownerName: 'John Doe',
    area: '3.2 acres',
    landType: 'Agricultural',
    geoJson: {
      type: 'Polygon',
      coordinates: [[[75.1250, 14.4580], [75.1270, 14.4580], [75.1270, 14.4600], [75.1250, 14.4600], [75.1250, 14.4580]]]
    }
  },
  '789/1': {
    landId: 'land_789_1',
    village: 'Honnali',
    tehsil: 'Honnali',
    district: 'Davangere',
    surveyNo: '789/1',
    ownerName: 'John Doe',
    area: '1.8 acres',
    landType: 'Agricultural',
    geoJson: {
      type: 'Polygon',
      coordinates: [[[75.1300, 14.4620], [75.1315, 14.4620], [75.1315, 14.4635], [75.1300, 14.4635], [75.1300, 14.4620]]]
    }
  },
  '999/1': {
    landId: 'land_999_1',
    village: 'Test Village',
    tehsil: 'Test Tehsil',
    district: 'Test District',
    surveyNo: '999/1',
    ownerName: 'John Doe',
    area: '4.0 acres',
    landType: 'Agricultural',
    geoJson: {
      type: 'Polygon',
      coordinates: [[[75.1350, 14.4650], [75.1370, 14.4650], [75.1370, 14.4670], [75.1350, 14.4670], [75.1350, 14.4650]]]
    }
  }
};

// Configuration for demo purposes
const DEMO_CONFIG = {
  hasExistingApplication: false, // Set to true to test with existing application
  userHasLandBuckets: true, // Set to false to test with no land buckets
};

// In-memory storage for demo application (in real app, this would be in database/storage)
let CURRENT_APPLICATION = null;

class FarmerService {
  static async getFarmerProfile() {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        data: {
          name: 'John Doe',
          fatherName: 'Father Name',
          mobile: '9999999999',
          aadhaarNumber: '************1234',
          applicationStatus: 'NOT_SUBMITTED',
          hasCompletedKYC: true
        }
      };
    } catch (error) {
      console.error('Get farmer profile error:', error);
      throw error;
    }
  }
}

class LandService {
  static async getLandBuckets() {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Use demo configuration
      if (DEMO_CONFIG.userHasLandBuckets) {
        return {
          success: true,
          buckets: DUMMY_LAND_BUCKETS
        };
      } else {
        return {
          success: true,
          buckets: []
        };
      }
    } catch (error) {
      console.error('Get land buckets error:', error);
      throw error;
    }
  }

  static async searchLand(searchData) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const { villageId, surveyNo } = searchData;
      const landDetails = DUMMY_LAND_SEARCH_RESULTS[surveyNo];
      
      if (landDetails) {
        return {
          success: true,
          landDetails
        };
      } else {
        return {
          success: false,
          message: 'Land parcel not found. Please check the survey number.'
        };
      }
    } catch (error) {
      console.error('Search land error:', error);
      throw error;
    }
  }
}

class ApplicationService {
  static async claimLands(claimData) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const { claimedBuckets, addedLands } = claimData;
      
      // Create and save the application
      const applicationId = 'app_' + Date.now();
      const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
      
      CURRENT_APPLICATION = {
        success: true,
        status: 'SUBMITTED',
        applicationId: applicationId,
        submittedDate: currentDate,
        lastUpdated: currentDate,
        totalLands: (claimedBuckets?.length || 0) + (addedLands?.length || 0),
        claimedBuckets: claimedBuckets || [],
        addedLands: addedLands || []
      };
      
      // Update demo config to reflect that user now has an application
      DEMO_CONFIG.hasExistingApplication = true;
      
      return {
        success: true,
        applicationId: applicationId,
        message: 'Land claim application submitted successfully',
        totalLands: (claimedBuckets?.length || 0) + (addedLands?.length || 0)
      };
    } catch (error) {
      console.error('Claim lands error:', error);
      throw error;
    }
  }

  static async getApplicationStatus() {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if we have a current application (from claimLands) or use demo config
      const hasApplication = CURRENT_APPLICATION || DEMO_CONFIG.hasExistingApplication;
      
      if (hasApplication && CURRENT_APPLICATION) {
        // Return the actual submitted application
        return CURRENT_APPLICATION;
      } else if (DEMO_CONFIG.hasExistingApplication) {
        // Return demo application data
        return {
          success: true,
          status: 'SUBMITTED',
          applicationId: 'app_123456',
          submittedDate: '2024-01-15',
          lastUpdated: '2024-01-20',
          totalLands: 3
        };
      } else {
        // Return success=false instead of throwing error for cleaner handling
        return {
          success: false,
          message: 'No application found',
          code: 'NO_APPLICATION'
        };
      }
    } catch (error) {
      console.error('Get application status error:', error);
      throw error;
    }
  }

  static resetDemoData() {
    // Reset demo application data
    CURRENT_APPLICATION = null;
    DEMO_CONFIG.hasExistingApplication = false;
    console.log('Demo data reset successfully');
  }
}

export { AuthService, KYCService, FarmerService, LandService, ApplicationService };