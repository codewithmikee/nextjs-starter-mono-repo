import { ApiResponse, PaginatedResponse } from '@/types/api-calls/api-types';
import axios, { AxiosRequestConfig } from 'axios';

// Create a typed API client helper
// export const apiClient = {
//     get: <T>(url: string, config?: AxiosRequestConfig) =>
//       privateApi.get<ApiResponse<T>>(url, config).then((res) => res.data.data),
//     post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
//       privateApi.post<ApiResponse<T>>(url, data, config).then((res) => res.data.data),
//     put: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
//       privateApi.put<ApiResponse<T>>(url, data, config).then((res) => res.data.data),
//     delete: <T>(url: string, config?: AxiosRequestConfig) =>
//       privateApi.delete<ApiResponse<T>>(url, config).then((res) => res.data.data),
//   };

//   // Factory function to create a resource-specific API
//   export const createResourceApi = <T extends { id: string }>(resourcePath: string) => ({
//     getAll: (params?: any) => privateApi.get<T[]>(`/${resourcePath}`, { params }),
//     getById: (id: string) => privateApi.get<T>(`/${resourcePath}/${id}`),
//     create: (data: Omit<T, 'id'>) => privateApi.post<T>(`/${resourcePath}`, data),
//     update: (id: string, data: Partial<T>) => privateApi.patch<T>(`/${resourcePath}/${id}`, data),
//     delete: (id: string) => privateApi.delete<void>(`/${resourcePath}/${id}`),
//   });

//   // Factory function to create a typed API
//   export const createTypedApi = <T>(baseUrl: string) => ({
//     get: (config?: AxiosRequestConfig) => privateApi.get<ApiResponse<T>>(baseUrl, config),
//     search: (query: Record<string, any>) =>
//       privateApi.get<ApiResponse<T[]>>(`${baseUrl}/search`, { params: query }),
//     createWithFile: (data: FormData) =>
//       privateApi.post<ApiResponse<T>>(baseUrl, data, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       }),
//     customMethod: (id: string, action: string) =>
//       privateApi.post<ApiResponse<T>>(`${baseUrl}/${id}/${action}`),
//   });

//   // Factory function to create a paginated API
//   export const createPaginatedApi = <T>(endpoint: string) => ({
//     getPaginated: (page: number, pageSize: number) =>
//       privateApi.get<PaginatedResponse<T>>(endpoint, {
//         params: { page, pageSize },
//       }),
//   });

// Utility for handling API errors
export const handleApiError = async <T>(
  apiCall: () => Promise<T>
): Promise<T | null> => {
  try {
    return await apiCall();
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
};

export const getErrorMessage = (error: any): string => {
  // Handle Zod validation errors with specific response format
  // Updated error format handling in getErrorMessage
  if (
    error?.response?.data?.error === 'Invalid data' &&
    error?.response?.data?.errors
  ) {
    return error.response.data.errors.map((err: any) =>
      typeof err === 'string'
        ? err
        : err.message || err.msg || JSON.stringify(err)
    );
  }

  // Handle Zod validation errors
  if (error?.errors && Array.isArray(error.errors)) {
    return error.errors.map((err: any) => err.message).join(', ');
  }

  // Handle axios or fetch errors with response data
  if (error?.response?.data?.error) {
    return error.response.data.error;
  }

  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  // Handle network errors
  if (error?.message === 'Network Error') {
    return 'Unable to connect to the server. Please check your internet connection.';
  }

  // Handle JWT/Authentication errors
  if (error?.message === 'TokenExpired') {
    return 'Your session has expired. Please log in again.';
  }

  if (error?.message === 'UnAuthenticated') {
    return 'Authentication failed. Please log in.';
  }

  // Handle generic errors
  if (typeof error === 'string') {
    return error;
  }

  if (error?.message) {
    return error.message;
  }

  // Fallback error message
  return 'An unexpected error occurred. Please try again later.';
};

export const buildUrl = (base: string, query?: Record<string, any>): string => {
  if (!query) return base;
  const queryString = new URLSearchParams(
    Object.entries(query)
      .filter(([_, value]) => value !== undefined && value !== null) // Remove undefined/null values
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value.toString() }), {})
  ).toString();

  return queryString ? `${base}?${queryString}` : base;
};

type Mutable<T> = {
  -readonly [K in keyof T]: T[K]; // Remove readonly restrictions
};

export const getSearchParams = <T extends Record<string, any>>(
  searchParams: Record<string, string>,
  defaultValues: T = {} as T
): T => {
  return Object.keys(defaultValues).reduce(
    (acc, key) => {
      const value = searchParams[key];

      if (value !== undefined) {
        (acc as any)[key] = isNaN(Date.parse(value)) ? value : new Date(value);
      }

      return acc;
    },
    { ...defaultValues } as Mutable<T>
  );
};

export const ApiCallHelpers = {
  buildUrl,
  getFormattedError: getErrorMessage
};
