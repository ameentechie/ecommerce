import { useState, useCallback } from 'react';

/**
 * Custom hook for managing loading states
 * @param {boolean} initialLoading - Initial loading state
 * @returns {Object} Loading state and control functions
 */
export const useLoadingState = (initialLoading = false) => {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [error, setError] = useState(null);

  const startLoading = useCallback(() => {
    setIsLoading(true);
    setError(null);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const setLoadingError = useCallback((errorMessage) => {
    setIsLoading(false);
    setError(errorMessage);
  }, []);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    startLoading,
    stopLoading,
    setLoadingError,
    reset,
  };
};

/**
 * Hook for managing async operations with loading states
 * @param {Function} asyncFunction - The async function to execute
 * @param {Object} options - Configuration options
 * @returns {Object} Execute function and loading state
 */
export const useAsyncOperation = (asyncFunction, options = {}) => {
  const { onSuccess, onError, showSuccessMessage = false } = options;
  const { isLoading, error, startLoading, stopLoading, setLoadingError } = useLoadingState();

  const execute = useCallback(async (...args) => {
    try {
      startLoading();
      const result = await asyncFunction(...args);
      stopLoading();
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (err) {
      const errorMessage = err.message || 'An error occurred';
      setLoadingError(errorMessage);
      
      if (onError) {
        onError(err);
      }
      
      throw err;
    }
  }, [asyncFunction, onSuccess, onError, startLoading, stopLoading, setLoadingError]);

  return {
    execute,
    isLoading,
    error,
  };
};

/**
 * Hook for managing multiple loading states
 * @param {Array} keys - Array of loading state keys
 * @returns {Object} Loading states and control functions
 */
export const useMultipleLoadingStates = (keys = []) => {
  const [loadingStates, setLoadingStates] = useState(
    keys.reduce((acc, key) => ({ ...acc, [key]: false }), {})
  );

  const setLoading = useCallback((key, isLoading) => {
    setLoadingStates(prev => ({ ...prev, [key]: isLoading }));
  }, []);

  const isAnyLoading = Object.values(loadingStates).some(Boolean);

  return {
    loadingStates,
    setLoading,
    isAnyLoading,
  };
};

export default useLoadingState; 