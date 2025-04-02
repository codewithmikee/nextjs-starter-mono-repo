// src/lib/api-client.ts
import { handleApiError, privateApi } from '@shared/lib/api-configurations/api-client';
import {
  providerApi
} from '@shared/lib/api-configurations/api-client-instance';
import {
  ProviderUserType,
  UserUpdateRelationsRequest
} from '@/types/user-types';
import { UserApiEndPoints } from './user-api-endpoints';
import {
  IAllUserResponse,
  IProviderDataResponse,
  IUserResponse
} from '@/types/api-calls/api-models';
import {
  ICommonUserCreateSchema,
  IResetPasswordSchema,
  IUpdateUserSchema
} from '@/schemas';
import { ActiveStatus } from '@/types/api-calls/backend-enums';

//   export const privateApi = apiClientInstance;
// export const providerApi = ApiClient('provider');
// Helper to construct user-type-specific paths
export const getUserTypePath = (userType: ProviderUserType) =>
  `users/${userType}`;

export const createUserApi = <K extends ProviderUserType>(userType: K) => ({
  // Common user actions
  updateProfile: (
    userId: string,
    data: UserApiEndPoints['user']['update']['request']
  ) =>
    handleApiError(() =>
      privateApi.post<UserApiEndPoints['user']['update']['response']>(
        `/user/${userId}/update`,
        data
      )
    ),

  changePassword: (
    userId: string,
    data: UserApiEndPoints['user']['changePassword']['request']
  ) =>
    handleApiError(() =>
      privateApi.post<UserApiEndPoints['user']['changePassword']['response']>(
        `/user/${userId}/change-password`,
        data
      )
    ),

  deleteUser: (userId: string) =>
    handleApiError(() =>
      privateApi.delete<UserApiEndPoints['user']['delete']['response']>(
        `/user/${userId}/delete`
      )
    ),

  getAll: () =>
    handleApiError(() =>
      providerApi.get<UserApiEndPoints['getAll']['response']>(`/users/all`)
    ),

  // User-type-specific actions
  list: () =>
    handleApiError(() =>
      providerApi.get<UserApiEndPoints[K]['list']['response']>(
        getUserTypePath(userType)
      )
    ),

  create: (data: UserApiEndPoints[K]['create']['request']) =>
    handleApiError(() =>
      providerApi.post<UserApiEndPoints[K]['create']['response']>(
        getUserTypePath(userType),
        data
      )
    ),

  updateRelations: (userId: string, data: UserUpdateRelationsRequest) =>
    handleApiError(() =>
      providerApi.post<UserApiEndPoints[K]['updateRelations']['response']>(
        `${getUserTypePath(userType)}/${userId}`,
        data
      )
    )
});

export const usersApi = {
  getAll: () => providerApi.get<IAllUserResponse>(`/users/all`),
  add: (data: ICommonUserCreateSchema) =>
    providerApi.post<IUserResponse>(`/users/add`, data),

  update: (userId: string, data: IUpdateUserSchema) =>
    privateApi.post<IUserResponse>(`/user/${userId}/update`, data),

  changeStatus: (userId: string, data: { status: ActiveStatus }) =>
    privateApi.post<ActiveStatus>(`/user/${userId}/change-status`, data),

  resetPassword: (userId: string, data: IResetPasswordSchema) =>
    privateApi.post<boolean>(`/user/${userId}/reset-password`, data),

  delete: (userId: string) =>
    privateApi.delete<boolean>(`/user/${userId}/delete`)
};

export const dataAPi = {
  getAll: () => providerApi.get<IProviderDataResponse>(`/data`)
};

export const adminApi = createUserApi('admins');
export const agentApi = createUserApi('agents');
export const cashierApi = createUserApi('cashiers');
export const superAgentAPi = createUserApi('superAgents');
