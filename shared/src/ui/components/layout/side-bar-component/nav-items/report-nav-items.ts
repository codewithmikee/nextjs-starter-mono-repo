import { UserRole } from '@/types/api-calls/backend-enums';
import { ISideNavItem } from '../nav-types';

type CashRoutes = 'general' | 'cashier' | 'byShop' | 'byAgent';

export const cashReportMapRoutes: Record<CashRoutes, ISideNavItem> = {
  general: {
    label: 'General',
    url: '/cash-report/general',
    icon: 'dollar'
  },
  cashier: {
    label: 'By Cashier',
    url: '/cash-report/by-cashier',
    icon: 'dollar'
  },
  byShop: {
    label: 'By Shop',
    url: '/cash-report/by-shop',
    icon: 'ticket'
  },
  byAgent: {
    label: 'By Agent',
    url: '/cash-report/by-agent',
    icon: 'game',
    unAllowedRoles: [UserRole.AGENT, UserRole.CASHIER]
  }
};

export const cashReportRoutes = [
  cashReportMapRoutes.general,
  cashReportMapRoutes.byShop,
  cashReportMapRoutes.byAgent,
  cashReportMapRoutes.cashier
];

// data reports

type DataReport = 'ticket' | 'game';

export const dataReportNamedRoute: Record<DataReport, ISideNavItem> = {
  ticket: {
    label: 'Ticket Report',
    url: '/ticket-report',
    icon: 'ticket'
  },
  game: {
    label: 'Game Report',
    url: '/game-report',
    icon: 'game'
  }
};

export const dataReportRoute = [
  dataReportNamedRoute.ticket,
  dataReportNamedRoute.game
];
