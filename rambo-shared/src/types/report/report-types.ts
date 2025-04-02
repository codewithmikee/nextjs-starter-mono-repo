import { TicketStatus } from '../api-calls/backend-enums';

// types/period.ts
export type PeriodParams = {
  from: string;
  to: string;
};

export type IReportFilter = {
  startDate?: string | null;
  endDate?: string | null;
  shopId?: string | null;
  agentId?: string | null;
  cashierId?: string | null;
};

export type IReportFilterWithPagination = {
  startDate?: string;
  endDate?: string;
  shopId?: string;
  agentId?: string;
  cashierId?: string;
  page?: number;
  limit?: number;
};

export type IReportFilterForDataReport = {
  gameId?: string;
} & IReportFilterWithPagination;

export type IReportFilterForTicket = {
  ticketId?: string;
  status?: TicketStatus;
} & IReportFilterForDataReport;

export interface IPrismaPagination {
  currentPage: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
