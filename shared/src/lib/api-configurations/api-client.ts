// lib/api-client.ts
import { ApiResponse, PaginatedResponse } from '@/types/api-calls/api-types';
import { RefreshTokenResponse } from '@/types/login-models';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';
import { useSession } from 'next-auth/react';
import { ApiError } from 'next/dist/server/api-utils';

// Create a reusable axios instance
export const createAxiosInstance = (
  isProtected: boolean = true,
  prefix: string | null = null
): AxiosInstance => {
  const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}${prefix ? `/${prefix}` : ''}`,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (isProtected) {
    // Request interceptor for adding auth token
    instance.interceptors.request.use(
      async (config) => {
        const { data: session } = useSession();

        if (session?.accessToken) {
          config.headers.Authorization = `Bearer ${session.accessToken}`;

          // Check if token is expired
          if (session.accessTokenExpires * 1000 < Date.now()) {
            try {
              const newTokens = await refreshAuthToken(session.refreshToken);
              // Update session with new tokens
              // Note: You'll need to implement token update logic (e.g., via NextAuth update)
              config.headers.Authorization = `Bearer ${newTokens.accessToken}`;
            } catch (error) {
              // Handle token refresh failure
              window.location.href = '/login';
              return Promise.reject(error);
            }
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for handling token expiration
    instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config;
        const session = useSession().data;

        if (
          error.response?.status === 401 &&
          originalRequest &&
          session?.refreshToken
        ) {
          try {
            const newTokens = await refreshAuthToken(session.refreshToken);
            // Update session with new tokens
            originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
            return instance(originalRequest);
          } catch (refreshError) {
            // Handle refresh token failure
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  return instance;
};

// Token refresh utility function
const refreshAuthToken = async (
  refreshToken: string
): Promise<RefreshTokenResponse> => {
  try {
    const response = await publicApi.post<ApiResponse<RefreshTokenResponse>>(
      '/auth/refresh',
      { refreshToken }
    );
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to refresh token');
  }
};

// Create public and private API instances
export const publicApi = createAxiosInstance(false);
export const privateApi = createAxiosInstance(true);

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
