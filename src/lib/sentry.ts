import * as Sentry from "@sentry/nextjs";

export function initSentry() {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || "https://your-dsn@sentry.io/project-id",

    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1.0,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: process.env.NODE_ENV === 'development',

    // Environment
    environment: process.env.NODE_ENV || 'development',

    // Enhanced error tracking
    integrations: [
      // Add default integrations for better error capture
    ],

    // Additional configuration for better error tracking
    beforeSend(event) {
      // Filter out development-only errors if needed
      if (process.env.NODE_ENV === 'development') {
        console.log('Sentry event:', event);
      }
      return event;
    },
  });

  // Capture console warnings and errors
  if (typeof window !== 'undefined') {
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;

    console.error = (...args) => {
      originalConsoleError.apply(console, args);

      // Check if this is a React Flow error
      const message = args.join(' ');
      if (message.includes('React Flow') || message.includes('nodeTypes') || message.includes('edgeTypes')) {
        captureMessage(`Console Error: ${message}`, 'error');
      }
    };

    console.warn = (...args) => {
      originalConsoleWarn.apply(console, args);

      // Check if this is a React Flow warning
      const message = args.join(' ');
      if (message.includes('React Flow') || message.includes('nodeTypes') || message.includes('edgeTypes')) {
        captureMessage(`Console Warning: ${message}`, 'warning');
      }
    };
  }
}

export function captureError(error: Error, context?: Record<string, unknown>) {
  Sentry.captureException(error, {
    tags: {
      component: "mindmap",
    },
    extra: context,
  });
}

export function captureMessage(message: string, level: Sentry.SeverityLevel = "info") {
  Sentry.captureMessage(message, level);
}
