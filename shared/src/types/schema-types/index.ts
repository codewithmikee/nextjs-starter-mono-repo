// Export all direct files
export * from './auth-schema-types';
export * from './common-schema';

// Export base schema types
export interface BaseSchema {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ValidationSchema {
  isValid: boolean;
  errors?: string[];
}

// Export schema types here
