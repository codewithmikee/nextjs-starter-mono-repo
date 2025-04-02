import { DateOrString } from '@shared/types';
import { UserRole, ActiveStatus, OddType } from './backend-enums';

export interface IUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  userName: string;
  phoneNumber: string | null;
  role: UserRole;
  status: ActiveStatus;
  createdAt: DateOrString;
  providerId: string | null;
  cashierShopId: string | null;
  superAgentId: string | null;
  agentProviderId: string | null;
  updatedAt: DateOrString;
}

export interface IUserWithFullName extends IUserResponse {
  fullName: string;
}

export interface IAllUserResponse {
  admins: IUserResponse[];
  agents: IUserResponse[];
  cashiers: IUserResponse[];
  superAgents: IUserResponse[];
}
// shop
export type IShopResponse = {
  id: string;
  identifier: string;
  name: string;
  address: string;
  status: ActiveStatus;
  createdAt: DateOrString;
  oddType: OddType;
  providerId: string;
  agentId: string | null;
  riskControlPolicy: IRiskPolicy;
};

export type IProviderDataResponse = {
  shops: IShopResponse[];
  users: IAllUserResponse;
  config: IProviderConfig;
};

export type IProviderResponse = {
  id: string;
  name: string;
  identifier: string;
  address: string;
  status: ActiveStatus;
  createdAt: DateOrString;
  oddType: OddType;
};

export type IProviderUsersResponse = {
  admins: IUserResponse[];
  agents: IUserResponse[];
  cashiers: IUserResponse[]; // can be filtered by shop
};

export type IRiskPolicy = {
  minBetAmount: number;
  maxBetAmount: number;
  maxWinAmountPerTicket: number;
  maxWinAmountPerDay: number;
};

export type IProviderConfig = {
  oddType: OddType;
  riskControlPolicy: IRiskPolicy;
};
