// Dummy API service for testing without real backend

class AuthService {
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
        return {
          success: true,
          token: 'dummy_jwt_token_' + Date.now(),
          isNewUser: mobileNumber === '9999999999' ? false : true, // 9999999999 is existing user
          userData: {
            name: 'Test User',
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

export { AuthService, KYCService };