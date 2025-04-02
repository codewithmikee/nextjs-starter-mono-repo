import { NavItem } from '@/types';
import { UserRole } from '@/types/api-calls/backend-enums';

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

type ProtectedRouteType = {
  route: string;
  allowedRoutes: UserRole[];
};

export const ProductRoutes: ProtectedRouteType[] = [
  {
    route: '/dashboard/admins',
    allowedRoutes: [UserRole.PROVIDER_ADMIN, UserRole.PROVIDER_SUPER_ADMIN]
  }
];

export const PagePaths = {
  DASHBOARD: '/dashboard',
  PROFILE: '/dashboard/profile',
  OVERVIEW: '/dashboard/overview',
  PRODUCT: '/dashboard/product',
  ADMINS: '/dashboard/admins',
  KANBAN: '/dashboard/kanban',
  LOGIN: '/',
  NOT_FOUND: '/404'
};

export const sharedNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: 'dashboard' // Reference to an icon in your `Icons` component
  },
  {
    title: 'Profile',
    url: '/profile',
    icon: 'user'
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: 'settings'
  }
];

//Info: The following data is used for the sidebar navigation and Cmd K bar.

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];
