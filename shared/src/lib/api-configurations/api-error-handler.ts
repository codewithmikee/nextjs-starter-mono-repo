// lib/error-handler.ts
import axios, { AxiosError } from 'axios';
import { ApiError } from 'next/dist/server/api-utils';

export const handleApiError = (error: AxiosError<ApiError>): string => {
  if (error.response) {
    // Server responded with non-2xx status
    return error.response.data.message || 'Request failed';
  } else if (error.request) {
    // No response received
    return 'Network error - please check your connection';
  } else {
    // Request setup error
    return 'Invalid request configuration';
  }
};

export const withErrorHandling = <T extends (...args: any[]) => any>(fn: T) => {
  return async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    try {
      return await fn(...args);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(handleApiError(error));
      }
      throw error;
    }
  };
};
