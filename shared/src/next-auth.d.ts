import 'next-auth';
import { ILoginUser } from './types/login-models';
import { UserRole } from './types/api-calls/backend-enums';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User extends ILoginUser {
    role?: UserRole;
  }

  interface Session extends DefaultSession {
    user: User;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    error?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User;
    role: UserRole;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    error?: string;
    user: User;
  }
}
