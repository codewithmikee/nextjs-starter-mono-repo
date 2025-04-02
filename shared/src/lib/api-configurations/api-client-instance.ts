import axios from 'axios';
import { getSession } from 'next-auth/react';

const ApiClient = (prefix?: string) => {
  const baseURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}${prefix ? `/${prefix}` : ''}`;

  const defaultOptions = {
    baseURL
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async (request) => {
    const session = await getSession();
    console.log('session', session);
    if (session) {
      request.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(`error`, error);
      throw error;
    }
  );

  return instance;
};

// export const privateApi = ApiClient();
export const providerApi = ApiClient('provider');
