const API_BASE_URL = 'https://your-api-domain.com'; // Replace with your actual API URL

class AuthService {
  static async sendOTP(mobileNumber, role) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobileNumber,
          role
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Send OTP error:', error);
      throw error;
    }
  }

  static async verifyOTP(mobileNumber, otp) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobileNumber,
          otp
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Verify OTP error:', error);
      throw error;
    }
  }
}

class KYCService {
  static async sendAadhaarOTP(aadhaarNumber) {
    try {
      const response = await fetch(`${API_BASE_URL}/kyc/aadhaar/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          aadhaarNumber
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Send Aadhaar OTP error:', error);
      throw error;
    }
  }

  static async verifyAadhaarOTP(transactionId, otp) {
    try {
      const response = await fetch(`${API_BASE_URL}/kyc/aadhaar/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transactionId,
          otp
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Verify Aadhaar OTP error:', error);
      throw error;
    }
  }
}

export { AuthService, KYCService };