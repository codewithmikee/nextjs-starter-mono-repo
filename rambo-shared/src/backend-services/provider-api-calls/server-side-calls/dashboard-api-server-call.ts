// src/services/dashboard.ts
// import { serverFetch } from '@/lib/api-utils'
// import { DashboardData } from '@/types/api'

import { IProviderOrAgentDashboardResponse } from '@/types';

import { serverFetch } from '@shared/lib/api-configurations/serverApi';
// import { IProviderOrAgentDashboardResponse } from '@/types/api-calls/dashbaord-type';

export async function getDashboardData(): Promise<IProviderOrAgentDashboardResponse> {
  return serverFetch<IProviderOrAgentDashboardResponse>('/dashboard');
}
