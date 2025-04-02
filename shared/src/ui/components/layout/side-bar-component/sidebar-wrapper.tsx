'use client';

import * as React from 'react';

// import { NavMain } from "@/ui/components/nav-main"
// import { NavProjects } from "@/ui/components/nav-projects"
// import { NavUser } from "@/ui/components/nav-user"
// import { TeamSwitcher } from "@/ui/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '@/ui-components';
import { NavUser } from './nav-user';
import { useSessionContext } from '@/contexts/SessionProvider';
import NavBarRenderer from './NavBarRenderer';
import { Skeleton } from '@/ui-components';

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { isLoading, isAuthenticated, userRole, user } = useSessionContext();

  if (!isAuthenticated && !isLoading) {
    return <></>;
  }

  if (!isAuthenticated) {
    return (
      <div className='flex flex-1 flex-col gap-4 p-4'>
        {Array.from({ length: 24 }).map((_, index) => (
          <Skeleton
            key={index}
            className='w-full'
            style={{
              height: `${Math.max(20, Math.random() * 100)}%`
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader className='h-16 border-b border-sidebar-border'>
        <NavUser user={user!} />
      </SidebarHeader>
      <SidebarContent>
        <NavBarRenderer userRole={userRole!} />
      </SidebarContent>
      <SidebarFooter>
        <></>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
