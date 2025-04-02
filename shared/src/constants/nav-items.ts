import { NavItem } from '@/types';
import { UserRole } from '@/types/api-calls/backend-enums';
import { AuthUserRole } from '@/types/enums';

export const DashboardNav: NavItem = {
  title: 'Dashboard',
  url: '/dashboard/overview',
  icon: 'dashboard',
  isActive: false,
  shortcut: ['d', 'd'],
  items: [] // Empty array as there are no child items for Dashboard
};

export const shopRoute: NavItem = {
  title: 'Shops',
  url: '/dashboard/shops',
  icon: 'shop',
  isActive: false,
  items: [] // No child items
};

export const commonNavItems: NavItem[] = [
  {
    title: 'Product',
    url: '/dashboard/product',
    icon: 'product',
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Kanban',
    url: '/dashboard/kanban',
    icon: 'kanban',
    shortcut: ['k', 'k'],
    isActive: false,
    items: [] // No child items
  }
];

const providerRoutes: NavItem[] = [
  {
    title: 'Cash Report',
    url: '/dashboard/cash-reports',
    icon: 'billing',
    isActive: false,
    items: [] // No child items
  },

  {
    title: 'Data Report',
    url: '/dashboard/data',
    baseUrl: '/dashboard/data',
    icon: 'user2',
    isActive: false,
    items: [
      {
        title: 'Tickets',
        url: 'tickets',
        icon: 'ticket',
        isActive: false,
        items: [] // No child items
      },
      {
        title: 'Games',
        url: 'games',
        icon: 'game',
        isActive: false,
        items: [] // No child items
      }
    ] // No child items
  },
  shopRoute,

  {
    title: 'Users',
    url: '/dashboard/users',
    baseUrl: '/dashboard/users',
    icon: 'user2',
    isActive: false,
    items: [
      {
        title: 'Admins',
        url: 'admins',
        icon: 'user2',
        isActive: false,
        notAllowedForRoles: [
          AuthUserRole.PROVIDER_ADMIN,
          AuthUserRole.AGENT,
          AuthUserRole.CASHIER
        ],
        items: [] // No child items
      },
      {
        title: 'Agents',
        url: 'agents',
        icon: 'user',
        isActive: false,
        notAllowedForRoles: [AuthUserRole.AGENT, AuthUserRole.CASHIER]
      },
      {
        title: 'Cashiers',
        url: 'cashiers',
        icon: 'user',
        isActive: false,
        notAllowedForRoles: [AuthUserRole.CASHIER]
      }
    ] // No child items
  },

  {
    title: 'Settings',
    url: '/dashboard/settings',
    baseUrl: '/dashboard/settings',
    icon: 'user2',
    isActive: false,
    items: [
      {
        title: 'Preferences',
        url: 'preferences',
        icon: 'userPen',
        isActive: false,

        items: [] // No child items
      },
      {
        title: 'Risk Management',
        url: 'risk-management',
        icon: 'settings'
      }
    ], // No child items
    notAllowedForRoles: [AuthUserRole.AGENT, AuthUserRole.CASHIER]
  }
];

export const navItems: Record<UserRole, NavItem[]> = {
  ADMIN: [
    {
      title: 'Product',
      url: '/dashboard/product',
      icon: 'product',
      isActive: false,
      items: [] // No child items
    },

    {
      title: 'Cash Reports',
      url: '/cash-reports',
      baseUrl: '/dashboard/cash-reports/',
      icon: 'user2',
      isActive: false,
      items: [
        {
          title: 'By Shop',
          url: 'by-shop',
          icon: 'product',
          isActive: false,
          items: [] // No child items
        },
        {
          title: 'By Agent',
          url: 'by-agent',
          icon: 'product',
          isActive: false,
          items: [] // No child items
        }
      ], // No child items
      notAllowedForRoles: [
        AuthUserRole.ADMIN,
        AuthUserRole.PROVIDER_SUPER_ADMIN,
        AuthUserRole.AGENT,
        AuthUserRole.CASHIER
      ]
    },
    {
      title: 'Admins',
      url: '/dashboard/admins',
      icon: 'user2',
      isActive: false,
      items: [], // No child items
      notAllowedForRoles: [
        AuthUserRole.PROVIDER_ADMIN,
        AuthUserRole.AGENT,
        AuthUserRole.CASHIER
      ]
    }
  ],
  PROVIDER_SUPER_ADMIN: providerRoutes,
  PROVIDER_ADMIN: providerRoutes,
  SUPER_AGENT: [],
  AGENT: [],
  CASHIER: []
};
