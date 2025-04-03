'use client';
import { useSession } from 'next-auth/react';
import React, { createContext, useContext } from 'react';
const SessionContext = createContext(undefined);
export const SessionProvider = ({ children }) => {
    const { data: session, status } = useSession();
    const value = {
        userRole: (session?.user).role, // Extract role from session
        isAuthenticated: status === 'authenticated',
        isLoading: status === 'loading',
        // user: session?.user
    };
    return (<SessionContext.Provider value={value}>{children}</SessionContext.Provider>);
};
// Custom hook to access session context
export const useSessionContext = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('useSessionContext must be used within a SessionProvider');
    }
    return context;
};
