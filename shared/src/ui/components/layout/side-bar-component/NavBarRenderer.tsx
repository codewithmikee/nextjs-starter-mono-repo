'use client';
import React from 'react';
import { ISideNavItem, ISideNavItemGroup } from './nav-types';
import {
  SidebarGroupLabel,
  SidebarGroup,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu,
  useSidebar
} from '@/ui-components';
import Link from 'next/link';
import { Icons } from '@/ui/components/icons';
import { UserRole } from '@/types/api-calls/backend-enums';
import { NAV_ITEMS } from './nav-items/all-nav-items';
import { usePathname } from 'next/navigation';

function NavBarRenderer({ userRole }: { userRole: UserRole }) {
  // const pathname = usePathname();
  // const isActive = (url: string) => pathname.startsWith(url);

  const filteredByUserRole = React.useMemo(() => {
    return NAV_ITEMS.map((mainGroup) => ({
      ...mainGroup,
      items: mainGroup.items.filter(
        (item) => !item.unAllowedRoles?.includes(userRole)
      )
    })).filter((group) => group.items.length > 0);
  }, [userRole]);

  const renderGroup = ({ groupTitle, items }: ISideNavItemGroup) => {
    return (
      <SidebarGroup key={groupTitle}>
        <SidebarGroupLabel>{groupTitle}</SidebarGroupLabel>
        <SidebarMenu>
          {items?.map((item, key) => (
            <NavItemRender item={item} key={`${groupTitle}-${key}`} />
          ))}
        </SidebarMenu>
      </SidebarGroup>
    );
  };

  function NavItemRender({ item }: { item: ISideNavItem }) {
    const pathname = usePathname();
    const { icon, label, url } = item;
    const isActive = url === '/' ? pathname === '/' : pathname.startsWith(url);
    //   const Icon = item.icon ? Icons[item.icon] : Icons.logo;

    const Icon = icon ? Icons[icon] : null;

    const {
      state,
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar
    } = useSidebar();
    const onClick = () => {
      if (isMobile && openMobile) {
        setOpenMobile(false);
      }
    };

    return (
      <SidebarMenuItem key={url}>
        <SidebarMenuButton asChild isActive={isActive} onClick={onClick}>
          <Link href={url}>
            {Icon && <Icon className='mr-2 h-4 w-4' />}
            <span>{label}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }
  return <>{filteredByUserRole.map((group) => renderGroup(group))}</>;
}

export default NavBarRenderer;
