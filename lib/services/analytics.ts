import { analytics } from '../firebase';
import { logEvent } from 'firebase/analytics';

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (analytics) {
    logEvent(analytics, eventName, params);
  }
};

export const trackScreen = (screenName: string, params?: Record<string, any>) => {
  if (analytics) {
    logEvent(analytics, 'screen_view', {
      screen_name: screenName,
      ...params,
    });
  }
};

export const trackUserAction = (action: string, params?: Record<string, any>) => {
  if (analytics) {
    logEvent(analytics, `user_${action}`, {
      timestamp: new Date().toISOString(),
      ...params,
    });
  }
};

export const trackError = (error: Error, context?: string) => {
  if (analytics) {
    logEvent(analytics, 'error', {
      error_name: error.name,
      error_message: error.message,
      error_stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
    });
  }
};