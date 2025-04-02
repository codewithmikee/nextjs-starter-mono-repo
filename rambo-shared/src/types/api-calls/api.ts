import { IUserResponse } from './api-models';

export interface ApiEndpoints {
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

  // Admin-specific endpoints
  admins: {
    list: {
      response: IUserResponse[];
    };
    create: {
      request: Omit<IUserResponse, 'id' | 'createdAt'>;
      response: IUserResponse;
    };
    updateRelations: {
      request: { userId: string; relations: any }; // Define proper type for relations
      response: IUserResponse;
    };
  };

  // Agent-specific endpoints
  agents: {
    list: {
      response: IUserResponse[];
    };
    create: {
      request: Omit<IUserResponse, 'id' | 'createdAt'>;
      response: IUserResponse;
    };
    updateRelations: {
      request: { userId: string; relations: any }; // Define proper type for relations
      response: IUserResponse;
    };
  };

  // Cashier-specific endpoints
  cashiers: {
    list: {
      response: IUserResponse[];
    };
    create: {
      request: Omit<IUserResponse, 'id' | 'createdAt'>;
      response: IUserResponse;
    };
    updateRelations: {
      request: { userId: string; relations: any }; // Define proper type for relations
      response: IUserResponse;
    };
  };
}
