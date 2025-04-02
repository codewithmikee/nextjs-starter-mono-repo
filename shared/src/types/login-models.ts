import { ActiveStatus, UserRole } from './api-calls/backend-enums';
import { DateOrString } from './general-types';

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
}

export interface IShopInfo {
  id: string;
  name: string;
  uniqueId: string;
}

export interface IProviderInfo {
  id: string;
  name: string;
  uniqueId: string;
}

export interface IUserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  userName: string;
  phoneNumber: string | null;
}

export interface ILoginUser extends IUserProfile {
  role: UserRole;
  status: ActiveStatus;
  createdAt: DateOrString;
  shopId: string | null;
  providerId: string | null;
  shop: IShopInfo | null;
  provider: IProviderInfo | null;
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
}
