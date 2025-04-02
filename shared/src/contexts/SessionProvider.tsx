'use client';

import { UserRole } from '@/types/api-calls/backend-enums';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { createContext, ReactNode, useContext } from 'react';

interface SessionContextValue {
  userRole?: UserRole; // Role of the logged-in user
  isAuthenticated: boolean; // Whether the user is logged in
  isLoading: boolean; // Whether the session is still loading
  user?: User;
}

const SessionContext = createContext<SessionContextValue | undefined>(
  undefined
);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();

  const value: SessionContextValue = {
    userRole: session?.user?.role, // Extract role from session
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    user: session?.user
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

// Custom hook to access session context
export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSessionContext must be used within a SessionProvider');
  }
  return context;
};
