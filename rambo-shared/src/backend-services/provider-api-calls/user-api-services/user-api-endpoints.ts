import { IAllUserResponse, IUserResponse } from '@/types/api-calls/api-models';
import {
  UserCreateSchema,
  UserUpdateRelationsRequest
} from '@/types/user-types';

export interface UserApiEndPoints {
  // Common user endpoints
  user: {
    update: {
      request: Partial<IUserResponse>;
      response: IUserResponse;
    };
    changePassword: {
      request: { oldPassword: string; newPassword: string };
      response: { success: boolean };
    };
    delete: {
      request: { userId: string };
      response: { success: boolean };
    };
  };

  getAll: {
    response: IAllUserResponse;
  };

  // Admin-specific endpoints
  admins: {
    list: {
      response: IUserResponse[];
    };
    create: {
      request: UserCreateSchema;
      response: IUserResponse;
    };
    updateRelations: {
      request: UserUpdateRelationsRequest; // Define proper type for relations
      response: IUserResponse;
    };
  };

  // Agent-specific endpoints
  agents: {
    list: {
      response: IUserResponse[];
    };
    create: {
      request: UserCreateSchema;
      response: IUserResponse;
    };
    updateRelations: {
      request: UserUpdateRelationsRequest;
      response: IUserResponse;
    };
  };
  // Agent-specific endpoints
  superAgents: {
    list: {
      response: IUserResponse[];
    };
    create: {
      request: UserCreateSchema;
      response: IUserResponse;
    };
    updateRelations: {
      request: UserUpdateRelationsRequest;
      response: IUserResponse;
    };
  };

  // Cashier-specific endpoints
  cashiers: {
    list: {
      response: IUserResponse[];
    };
    create: {
      request: UserCreateSchema;
      response: IUserResponse;
    };
    updateRelations: {
      request: UserUpdateRelationsRequest; // Define proper type for relations
      response: IUserResponse;
    };
  };
}
