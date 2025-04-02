import { UserRole } from './api-calls/backend-enums';
// import { AgentWithSuperAgent } from './report/cash-report-types';

export type ISimpleShopInfo = {
  id: string;
  name: string;
  identifier: string;
  agentId?: string | null;
};


export type ISimpleUserInfo = {
  name: string;
  id: string;
  userName: string;
  role: UserRole;
};

export type ISimpleUserInfoForRelation = {
  id: string;
  userName: string | null;
  firstName: string;
  lastName: string;
};
