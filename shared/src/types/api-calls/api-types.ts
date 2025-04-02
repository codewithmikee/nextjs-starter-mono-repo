export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

// Define your API response structure
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  statusCode: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

export interface IServerResponse<T> {
  data?: T;
  error?: string;
}
