import { Icons } from '@/ui/components/icons';
import { UserRole } from '@/types/api-calls/backend-enums';
import { ISideNavItem, ISideNavItemGroup } from '../nav-types';
import { cashReportRoutes, dataReportRoute } from './report-nav-items';

export const shopRoute: ISideNavItem = {
  label: 'Shops',
  url: '/shops',
  icon: 'shop'
};

export const superAgentRoute: ISideNavItem = {
  label: 'Super Agents',
  url: '/super-agents',
  icon: 'superAgent',
  unAllowedRoles: [UserRole.SUPER_AGENT, UserRole.AGENT, UserRole.CASHIER]
};

export const agentRoute: ISideNavItem = {
  label: 'Agents',
  url: '/agents',
  icon: 'user2',
  unAllowedRoles: [UserRole.AGENT, UserRole.CASHIER]
};

export const NAV_ITEMS: ISideNavItemGroup[] = [
  {
    groupTitle: 'Dashboard',
    items: [
      {
        label: 'Dashboard',
        url: '/dashboard',
        icon: 'dashboard'
      }
    ]
  },
  {
    groupTitle: 'Cash Reports',
    items: cashReportRoutes
  },
  {
    groupTitle: 'Data Reports',
    items: dataReportRoute
  },
  {
    groupTitle: 'Client Management',
    items: [superAgentRoute, agentRoute, shopRoute]
  },
  {
    groupTitle: 'Team Members',
    items: [
      {
        label: 'Admins',
        url: '/admins',
        icon: 'user',
        unAllowedRoles: [
          UserRole.ADMIN,
          UserRole.SUPER_AGENT,
          UserRole.AGENT,
          UserRole.CASHIER
        ]
      }
    ]
  },
  {
    groupTitle: 'Settings',
    items: [
      {
        label: 'Risk Management',
        url: '/risk-management',
        icon: 'shield',
        unAllowedRoles: [UserRole.SUPER_AGENT, UserRole.AGENT, UserRole.CASHIER]
      },
      {
        label: 'Odd Settings',
        url: '/settings/odds',
        icon: 'setting',
        unAllowedRoles: [UserRole.SUPER_AGENT, UserRole.AGENT, UserRole.CASHIER]
      }
    ]
  }
];

export const navItemFlatten: ISideNavItem[] = NAV_ITEMS.reduce(
  (acc: ISideNavItem[], group) => {
    return [...acc, ...group.items];
  },
  []
);

export const shopNavigation = {
  detail: (shopId: string) => `${shopRoute.url}/${shopId}`,
  edit: (shopId: string) => `${shopRoute.url}/edit/${shopId}`,
  new: `${shopRoute.url}/new`
};

export const isPathNotAllowedForUserRole = (userRole: UserRole, path: string) =>
  navItemFlatten.find(
    (navItem) =>
      path.startsWith(navItem.url) &&
      navItem.unAllowedRoles &&
      navItem.unAllowedRoles.includes(userRole)
  );
