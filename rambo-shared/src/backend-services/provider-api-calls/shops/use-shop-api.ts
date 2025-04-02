// src/lib/api-client.ts
import { handleApiError } from '@/lib/api-configurations/api-client';
import { providerApi } from '@/lib/api-configurations/api-client-instance';
import { ShopApiEndPoints } from './shop-api-end-points';
import { IShopResponse } from '@/types/api-calls/api-models';
import { IShopCreateSchema } from '@/types/schema-types/shop-schema';
import { ActiveStatus } from '@/types/api-calls/backend-enums';

//   export const privateApi = apiClientInstance;
// export const providerApi = ApiClient('provider');
// Helper to construct user-type-specific paths

export const shopApi = {
  // Common user actions
  update: (shopId: string, data: ShopApiEndPoints['update']['request']) =>
    providerApi.post<ShopApiEndPoints['update']['response']>(
      `shops/${shopId}/update`,
      data
    ),

  changeStatus: (shopId: string, data: { status: ActiveStatus }) =>
    providerApi.post<ActiveStatus>(`shops/${shopId}/change-status`, data),

  delete: (shopId: string) =>
    providerApi.delete<boolean>(`shops/${shopId}/delete`),

  create: (data: IShopCreateSchema) =>
    providerApi.post<IShopResponse>('shops/add', data)
};
