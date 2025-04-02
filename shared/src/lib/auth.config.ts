import { authApi, saveAuthAPi } from '@/backend-services/auth-api';
import axios from 'axios';
import NextAuthConfig from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        userName: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: any) {
        try {
          const response = await saveAuthAPi.login({
            userName: credentials.userName as string,
            password: credentials.password as string
          });

          const user = response.data;
          ``;
          // Return the user along with required fields for session and JWT
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
      // if (trigger === "update") {
      //   // Handle token refresh
      //   try {
      //     const response = await axios.post<{
      //       accessToken: string;
      //       refreshToken: string;
      //       accessTokenExpires: number;
      //     }>("http://localhost:3001/api/auth/refresh", {
      //       refreshToken: token.refreshToken,
      //     });

      //     return {
      //       ...token,
      //       ...response.data,
      //     };
      //   } catch (error) {
      //     return { ...token, error: "RefreshAccessTokenError" };
      //   }
      // }

      try {
        if (user) {
          token.user = user as any;
          return {
            ...token,
            ...user,
            user: user as any
          };
        }
        return token;
      } catch (error) {
        console.log('Error on jwt', error);
        return token;
      }

      // if (Date.now() < token.accessTokenExpires as number) {
      //   return token;
      // }

      // return refreshToken(token);
    },
    async session({ session, user, token }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.accessTokenExpires = token.accessTokenExpires as number;
      session.user = token.user as any;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin'
  }
} satisfies NextAuthConfig;

export default authConfig;
