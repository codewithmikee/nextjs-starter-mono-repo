import * as apiClient from './api-client';
import * as apiClientInstance from './api-client-instance';

export const client = {
  ...apiClient,
  ...apiClientInstance
};

export { handleApiError } from './api-error-handler';

import * as apiHelpers from './api-helpers';
export const helpers = apiHelpers;

export * from './api-client';
export * from './api-client-instance';
export * from './api-error-handler';
export * from './api-helpers';
