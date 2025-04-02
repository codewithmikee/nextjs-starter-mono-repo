// import { providerApi } from '@/lib/api-configurations/api-client';
import { providerApi } from '@/lib';
import { IProviderDataResponse } from '@/types/api-calls/api-models';

export const initialDataApi = {
  getAll: () => providerApi.get<IProviderDataResponse>(`/data`)
};
