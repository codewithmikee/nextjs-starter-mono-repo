import { Icons } from '@/ui/components/icons';
import { UserRole } from '@/types/api-calls/backend-enums';

export interface ISideNavItem {
  url: string;
  icon?: keyof typeof Icons;
  label: string;
  isActive?: boolean;
  unAllowedRoles?: UserRole[];
}

export interface ISideNavItemGroup {
  groupTitle: string;
  items: ISideNavItem[];
}
