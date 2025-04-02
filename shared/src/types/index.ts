import { AuthUserRole } from './enums';

// Export all types from each directory
export * from './shared';
export * from './api-calls';
export * from './schema-types';
export * from './component-types';
export * from './simple-types';
export * from './login-models';
export * from './general-types';

// Re-export common types
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export type PaginationParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// TODO: UPDATE THIS TO USE THE ICONS COMPONENT FROM THE UI PACKAGE
// import { Icons } from "@/ui-components/icons";
// import { UserRole } from './api-calls/backend-enums';

export interface NavItem {
  title: string;
  url: string;
  baseUrl?: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: any;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
  notAllowedForRoles?: AuthUserRole[];
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;
export type SidebarNavItem = NavItemWithChildren;



export enum ActiveStatus {
  ACTIVE = 'ACTIVE',
  IN_ACTIVE = 'IN_ACTIVE'
}


export interface IPrismaPagination {
  currentPage: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
