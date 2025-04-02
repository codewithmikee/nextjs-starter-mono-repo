
import CredentialsProvider from 'next-auth/providers/credentials';
// import { authApi } from '../backend-services/auth-api';
import NextAuth from "next-auth"
import { authApi } from '@/backend-services';

export const authConfig = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        userName: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) : Promise<any | null> {
        try {
          const response = await authApi.login({
            userName: credentials?.userName as string,
            password: credentials?.password as string
          });

          const user = response.data;
          return user;
        } catch (error) {
          console.error('Login error:', error);
          return null;
        }
      }
    })
  ],

  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = user.accessTokenExpires;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.accessTokenExpires = token.accessTokenExpires;
      return session;
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
})


