import * as Sentry from '@sentry/react-native';
import { Platform } from 'react-native';
import { version } from '../../package.json';

export const initializeMonitoring = () => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
      enableAutoSessionTracking: true,
      sessionTrackingIntervalMillis: 30000,
      debug: false,
      environment: process.env.NODE_ENV,
      release: version,
      dist: Platform.OS,
      beforeSend(event) {
        // Sanitize sensitive data
        if (event.request?.headers) {
          delete event.request.headers['Authorization'];
        }
        return event;
      },
      integrations: [
        new Sentry.ReactNativeTracing({
          tracingOrigins: ['localhost', 'sparkshift.app'],
          routingInstrumentation: Sentry.routingInstrumentation,
        }),
      ],
      tracesSampleRate: 0.2,
    });
  }
};

export const setUserContext = (userId: string, email?: string) => {
  Sentry.setUser({
    id: userId,
    email,
  });
};

export const clearUserContext = () => {
  Sentry.setUser(null);
};

export const captureException = (error: Error, context?: Record<string, any>) => {
  Sentry.captureException(error, {
    extra: context,
  });
};

export const startTransaction = (name: string, op: string) => {
  return Sentry.startTransaction({
    name,
    op,
  });
};