import { commonNavItems, DashboardNav, navItems } from '@/constants/nav-items';
import { NavItem } from '@/types';
import { UserRole } from '@/types/api-calls/backend-enums';
import { AuthUserRole } from '@/types/enums';

export function getNavItems(userRole?: UserRole): NavItem[] {
  const common: NavItem[] = [DashboardNav, ...commonNavItems];

  if (!userRole) return common;

  const roleBasedNavItems: NavItem[] = navItems[userRole].filter(
    (item) =>
      !item.notAllowedForRoles ||
      item.notAllowedForRoles?.length == 0 ||
      !item.notAllowedForRoles?.includes(userRole as any)
  );

  return [...common, ...roleBasedNavItems];
}

export const removeDoubleSlashes = (url: string) => url.replace(/\/$/, '');
