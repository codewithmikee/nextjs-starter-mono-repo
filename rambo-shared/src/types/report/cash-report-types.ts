import { IServerResponse } from '@shared/types';
import { ISimpleShopInfo, ISimpleUserInfo } from '@shared/types/simple-types';
import { RevenueSummary } from '../api-calls';

export type ICashReportForResponse = {
  collected: number;
  paid: number;
  toBePaid: number;
};

export type ICashReportWithNet = {
  revenue: number;
  netRevenue: number;
} & ICashReportForResponse;

export type ICashReportResponse = {
  cashierId: string;
  report: ICashReportForResponse;
};

export type IUserCashReport = RevenueSummary & ISimpleUserInfo;

export type ICashierCashReport = {
  shop: ISimpleShopInfo;
} & IUserCashReport;

export type IAgentCashReport = RevenueSummary & AgentWithSuperAgent;

export type IShopCashReport = {
  agent?: AgentWithSuperAgent;
} & ISimpleShopInfo &
  RevenueSummary;

export type IUseCashReportFilterReturnProps = {
  cashiers: ISimpleUserInfo[];
  agents: AgentWithSuperAgent[];
  shops: ISimpleShopInfo[];
};

export type IAgentForQuery = {
  isSuperAgent?: boolean;
} & ISimpleUserInfo;

export type AgentWithSuperAgent = {
  superAgent?: IAgentForQuery;
  superAgentId?: string;
  agentIdsUnder?: string[];
} & IAgentForQuery;
