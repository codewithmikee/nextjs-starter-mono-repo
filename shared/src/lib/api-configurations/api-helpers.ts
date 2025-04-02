


export const getErrorMessage = (error: any): string => {
  // Handle Zod validation errors with specific response format
  // Updated error format handling in getErrorMessage
  if (
    error?.response?.data?.error === 'Invalid data' &&
    error?.response?.data?.errors
  ) {
    return error.response.data.errors.map((err: any) =>
      typeof err === 'string'
        ? err
        : err.message || err.msg || JSON.stringify(err)
    );
  }

  // Handle Zod validation errors
  if (error?.errors && Array.isArray(error.errors)) {
    return error.errors.map((err: any) => err.message).join(', ');
  }

  // Handle axios or fetch errors with response data
  if (error?.response?.data?.error) {
    return error.response.data.error;
  }

  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  // Handle network errors
  if (error?.message === 'Network Error') {
    return 'Unable to connect to the server. Please check your internet connection.';
  }

  // Handle JWT/Authentication errors
  if (error?.message === 'TokenExpired') {
    return 'Your session has expired. Please log in again.';
  }

  if (error?.message === 'UnAuthenticated') {
    return 'Authentication failed. Please log in.';
  }

  // Handle generic errors
  if (typeof error === 'string') {
    return error;
  }

  if (error?.message) {
    return error.message;
  }

  // Fallback error message
  return 'An unexpected error occurred. Please try again later.';
};

export const buildUrl = (base: string, query?: Record<string, any>): string => {
  if (!query) return base;
  const queryString = new URLSearchParams(
    Object.entries(query)
      .filter(([_, value]) => value !== undefined && value !== null) // Remove undefined/null values
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value.toString() }), {})
  ).toString();

  return queryString ? `${base}?${queryString}` : base;
};

type Mutable<T> = {
  -readonly [K in keyof T]: T[K]; // Remove readonly restrictions
};

export const getSearchParams = <T extends Record<string, any>>(
  searchParams: Record<string, string>,
  defaultValues: T = {} as T
): T => {
  return Object.keys(defaultValues).reduce(
    (acc, key) => {
      const value = searchParams[key];

      if (value !== undefined) {
        (acc as any)[key] = isNaN(Date.parse(value)) ? value : new Date(value);
      }

      return acc;
    },
    { ...defaultValues } as Mutable<T>
  );
};

export const ApiCallHelpers = {
  buildUrl,
  getFormattedError: getErrorMessage
};
