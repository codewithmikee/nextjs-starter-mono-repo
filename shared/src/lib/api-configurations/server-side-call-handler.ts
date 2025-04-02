import { buildUrl } from '@/lib/api-configurations/api-helpers';
import { serverFetch } from '@/lib/api-configurations/serverApi';

export class ServerApiService {
  static async get<TResponse>(path: string, query?: Record<string, any>) {
    return serverFetch<TResponse>(buildUrl(`/${path}`, query));
  }
}
