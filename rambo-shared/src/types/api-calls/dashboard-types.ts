// Base Stats for Dashboard
export interface DashboardBaseStats {
  totalRevenue: number;
  totalPaidOut: number;
  pendingPayouts: number;
  netProfit: number;
}

// Revenue Summary
export interface RevenueSummary {
  totalCollected: number;
  totalPaid: number;
  toBePaid: number;
  revenue: number;
  netRevenue: number;
}

// Shop Performance
export interface ShopPerformance {
  shopId: string;
  shopName: string;
  shopAddress?: string;
  revenue: number;
}

// Summary of Shop Statistics
export interface IShopSummaryForDashboard {
  topGainers: ShopPerformance[];
  topLosers: ShopPerformance[];
  inactiveCount: number;
  totalShop?: number;
}

// Cashier Performance Summary
export interface CashierPerformance {
  cashierId: string;
  cashierName: string;
  totalCollected: number;
  totalPaid: number;
  revenue: number;
}

// Base Response Interface for all Dashboards
export interface IDashboardResponse {
  revenueSummary: RevenueSummary;
  shopSummary: IShopSummaryForDashboard;
  topCashiers: CashierPerformance[];
}

/**
 * **Admin Dashboard Response**
 * - Includes overall statistics for all shops and providers.
 */
export interface AdminDashboardResponse extends DashboardBaseStats {
  topCashiers: CashierPerformance[];
  providerStats: {
    total: number;
    active: number;
  };
  revenueSummary: RevenueSummary;
  shopStats: IShopSummaryForDashboard;
}

/**
 * **Provider Dashboard Response**
 * - Returns statistics for shops managed by the provider.
 */
export interface ProviderDashboardResponse extends DashboardBaseStats {
  revenueSummary: RevenueSummary;
  topCashiers: CashierPerformance[];
  shopStats: IShopSummaryForDashboard;
}

/**
 * **Agent Dashboard Response**
 * - Returns statistics for shops managed by an agent.
 */
export interface AgentDashboardResponse extends DashboardBaseStats {
  shopStats: IShopSummaryForDashboard;
  topCashiers: CashierPerformance[];
  revenueSummary: RevenueSummary;
}

/**
 * **Super Agent Dashboard Response**
 * - Returns statistics for shops managed by a super agent.
 */
export interface SuperAgentDashboardResponse extends DashboardBaseStats {
  shopStats: IShopSummaryForDashboard;
  topCashiers: CashierPerformance[];
  revenueSummary: RevenueSummary;
}

/**
 * **Cashier Dashboard Response**
 * - Returns statistics for a specific cashier.
 */
export interface CashierDashboardResponse extends DashboardBaseStats {
  personalStats: {
    totalTickets: number;
    ticketsByStatus: Record<string, number>;
    averageTicketValue: number;
    winRate: number;
  };
  recentTickets: {
    id: string;
    status: string;
    betAmount: number;
    winAmount: number;
    createdAt: Date;
  }[];
}

// Union type for Provider or Agent Dashboard Response
export type IProviderOrAgentDashboardResponse =
  | ProviderDashboardResponse
  | AgentDashboardResponse;
