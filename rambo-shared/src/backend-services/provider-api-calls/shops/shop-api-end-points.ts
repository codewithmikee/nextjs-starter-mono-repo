import { IShopResponse } from '@/types/api-calls/api-models';
import { ActiveStatus } from '@/types/api-calls/backend-enums';
import {
  IShopCreateSchema,
  IShopUpdateSchema
} from '@/types/schema-types/shop-schema';
import {
  UserCreateSchema,
  UserUpdateRelationsRequest
} from '@/types/user-types';

export interface ShopApiEndPoints {
  // Common user endpoints
  list: {
    response: IShopResponse[];
  };
  create: {
    request: IShopCreateSchema;
    response: IShopResponse;
  };
  updateRelations: {
    request: UserUpdateRelationsRequest; // Define proper type for relations
    response: IShopResponse;
  };
  update: {
    request: IShopUpdateSchema;
    response: IShopResponse;
  };

  changeStatus: {
    request: { status: ActiveStatus };
    response: IShopResponse;
  };

  delete: {
    request: { userId: string };
    response: { success: boolean };
  };
}
