'use client';

import UnAuthorizedCard from '@/components/common/UnAuthorizedCard';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';

export function withRoleProtection<P extends { children?: ReactNode }>(
  Component: React.ComponentType<P>,
  allowedRoles: string[]
) {
  return function RoleProtectedComponent(props: P) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (
        status === 'authenticated' &&
        !allowedRoles.includes(session?.user?.role || '')
      ) {
        router.replace('/403'); // Redirect if the user role is not allowed
      }
    }, [status, session, router]);

    // Show a loading state while checking the session
    if (status === 'loading') {
      return <div>Loading...</div>;
    }

    // Render the protected component if the user's role is allowed
    if (
      status === 'authenticated' &&
      allowedRoles.includes(session?.user?.role || '')
    ) {
      return <Component {...props} />;
    }

    // Render the protected component if the user's role is allowed
    if (
      status === 'authenticated' &&
      !allowedRoles.includes(session?.user?.role || '')
    ) {
      return <UnAuthorizedCard />;
    }

    // Return null to prevent rendering if the role is not allowed
    return null;
  };
}
