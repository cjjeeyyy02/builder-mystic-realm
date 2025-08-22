/**
 * Utility functions to handle ResizeObserver errors
 * These errors are common with UI libraries and don't affect functionality
 */

/**
 * Suppresses ResizeObserver loop error messages
 * This is a common issue with UI libraries like shadcn/ui Dialog components
 */
export const suppressResizeObserverError = (): void => {
  // Suppress webpack dev server error overlays
  const resizeObserverErrDiv = document.getElementById('webpack-dev-server-client-overlay-div');
  const resizeObserverErr = document.getElementById('webpack-dev-server-client-overlay');
  
  if (resizeObserverErrDiv) {
    resizeObserverErrDiv.style.display = 'none';
  }
  if (resizeObserverErr) {
    resizeObserverErr.style.display = 'none';
  }
};

/**
 * Initialize ResizeObserver error handling
 * Call this once in your app initialization
 */
export const initResizeObserverErrorHandling = (): void => {
  // Handle ResizeObserver errors globally
  window.addEventListener('error', (event: ErrorEvent) => {
    if (event.message === 'ResizeObserver loop completed with undelivered notifications.') {
      suppressResizeObserverError();
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  });

  // Handle unhandled promise rejections related to ResizeObserver
  window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
    if (event.reason && event.reason.message && 
        event.reason.message.includes('ResizeObserver loop completed')) {
      suppressResizeObserverError();
      event.preventDefault();
    }
  });

  // Suppress console warnings for ResizeObserver
  const originalConsoleError = console.error;
  console.error = (...args: any[]) => {
    if (args.length > 0 && 
        typeof args[0] === 'string' && 
        args[0].includes('ResizeObserver loop completed')) {
      return; // Suppress this specific error
    }
    originalConsoleError.apply(console, args);
  };
};

/**
 * Create a debounced ResizeObserver for custom implementations
 * Helps prevent the loop error when creating custom ResizeObserver instances
 */
export const createDebouncedResizeObserver = (
  callback: ResizeObserverCallback,
  delay: number = 100
): ResizeObserver => {
  let timeoutId: NodeJS.Timeout;
  
  const debouncedCallback: ResizeObserverCallback = (entries, observer) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(entries, observer);
    }, delay);
  };

  return new ResizeObserver(debouncedCallback);
};
