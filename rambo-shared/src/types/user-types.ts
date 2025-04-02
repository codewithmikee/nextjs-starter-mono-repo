import { IUserResponse } from './api-calls/api-models';

// Define a type for valid user types
export type ProviderUserType = 'admins' | 'agents' | 'superAgents' | 'cashiers';

export type UserCreateSchema = Omit<
  IUserResponse,
  | 'id'
  | 'createdAt'
  | 'providerId'
  | 'agentProviderId'
  | 'cashierShopId'
  | 'status'
  | 'role'
>;

export type UserUpdateRelationsRequest = {
  userId: string;
  data: {
    shopId?: string;
    shopIds?: string[];
  };
};
