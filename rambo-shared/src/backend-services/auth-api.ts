import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface LoginCredentials {
  userName: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
  user: {
    id: string;
    userName: string;
    role: string;
  };
}

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    return axios.post<AuthResponse>(`${API_URL}/api/auth/login`, credentials);
  },

  refreshToken: async (refreshToken: string) => {
    return axios.post<AuthResponse>(`${API_URL}/api/auth/refresh`, {
      refreshToken,
    });
  },

  logout: async () => {
    return axios.post(`${API_URL}/api/auth/logout`);
  },
};
