import { Linking } from 'react-native';
import { router } from 'expo-router';

export const handleDeepLink = (event) => {
  let data = Linking.parse(event.url);
  
  // Handle different types of deep links
  switch (data.path) {
    case 'pricing':
      router.push('/screens/pricing');
      break;
    case 'resources':
      router.push('/screens/resources');
      break;
    case 'qr':
      if (data.queryParams && data.queryParams.code) {
        handleQRCode(data.queryParams.code);
      }
      break;
    default:
      // Handle unknown routes
      router.push('/');
  }
};

export const handleQRCode = async (code) => {
  try {
    // Verify QR code format
    if (!code || typeof code !== 'string') {
      throw new Error('Invalid QR code format');
    }

    // Here you would typically validate the QR code with your backend
    const response = await validateQRCode(code);
    
    if (response.valid) {
      // Handle valid QR code
      switch (response.type) {
        case 'apprentice_hours':
          router.push({
            pathname: '/screens/log-hours',
            params: { apprenticeId: response.apprenticeId }
          });
          break;
        case 'evaluation':
          router.push({
            pathname: '/screens/evaluation',
            params: { evaluationId: response.evaluationId }
          });
          break;
        default:
          console.warn('Unknown QR code type:', response.type);
      }
    } else {
      throw new Error('Invalid QR code');
    }
  } catch (error) {
    console.error('Error handling QR code:', error);
    // Show error UI
    router.push({
      pathname: '/screens/error',
      params: { message: error.message }
    });
  }
};

// Mock function - replace with actual API call
const validateQRCode = async (code) => {
  // This would be replaced with an actual API call to your backend
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock response
      resolve({
        valid: true,
        type: 'apprentice_hours',
        apprenticeId: 'mock-id'
      });
    }, 500);
  });
};
