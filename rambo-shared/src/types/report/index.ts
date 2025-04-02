import { ISimpleShopInfo } from '@shared/types';
import { AgentWithSuperAgent } from './cash-report-types';

// Export all direct files
export * from './cash-report-types';
export * from './game-reports';
export * from './report-types';

// Export from subdirectories
export * from './ticket-reports';


export type IShopInfoWithAgent = {
  agent?: AgentWithSuperAgent;
} & ISimpleShopInfo;

// Export base report types
export interface ReportFilters {
  startDate?: Date;
  endDate?: Date;
  type?: string;
  status?: string;
}

export interface ReportData {
  id: string;
  title: string;
  data: any;
  createdAt: Date;
  updatedAt: Date;
}
