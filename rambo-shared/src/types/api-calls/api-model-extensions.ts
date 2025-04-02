import { IProviderResponse, IShopResponse, IUserResponse } from './api-models';

export interface IShopWithRelations extends IShopResponse {
  agent: IUserResponse | null;
  cashiers: IUserResponse[];
}

export interface IProviderWithRelations extends IProviderResponse {
  // Relations with Users
  shops: IShopResponse[];
  admins: IUserResponse[];
  agents: IUserResponse[];
}
