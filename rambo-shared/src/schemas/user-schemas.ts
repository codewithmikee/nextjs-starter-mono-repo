import { z } from 'zod';
import { UserRole } from '@/types';
import { getEnumValues } from '@shared/utils/helpers';
import { ActiveStatusSchema } from '@shared/types/schema-types/common-schema';

// Regular expressions for Ethiopian phone numbers
const ethiopianPhoneNumberRegExp = /^(09|\+2519)\d{8}$/;
export const ethiopianPhoneNumberSchema = z
  .string()
  .regex(ethiopianPhoneNumberRegExp, {
    message:
      'Invalid Ethiopian phone number format. It should start with "09" or "+2519" followed by 8 digits'
  });

export const identifierSchema = z.string().regex(/^[a-z0-9-]+$/, {
  message:
    'Invalid identifier. Value must be all lowercase with no spaces, and can include "-" character.'
});

const baseNameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters long')
  .max(50, 'Name must not exceed 50 characters');

// First name schema
const firstNameSchema = baseNameSchema.regex(
  /^[A-Za-z]+$/,
  'First name must contain only letters and no spaces'
);

// Last name schema (allows hyphens for compound last names)
const lastNameSchema = baseNameSchema.regex(
  /^[A-Za-z]+(-[A-Za-z]+)*$/,
  'Last name must contain only letters, and optionally one hyphen'
);

// Username schema (allows letters, numbers, underscores, and hyphens)
const userNameSchema = z
  .string()
  .min(3, 'Username must be at least 3 characters long')
  .max(30, 'Username must not exceed 30 characters')
  .regex(/^\S+$/, 'Username should have no spaces');

export const emailSchema = z.string().email().optional().nullish();

const fullNameSchema = z
  .string()
  .trim()
  .min(3, 'Full name must be at least 3 characters long')
  .max(50, 'Full name cannot exceed 50 characters')
  .regex(
    /^[A-Za-zÀ-ÖØ-öø-ÿ'’ -]+(?: [A-Za-zÀ-ÖØ-öø-ÿ'’ -]+)+$/,
    'Enter a valid full name (first & last)'
  );

// end of common user schemas

// change password schema
export const changePasswordSchema = z
  .object({
    oldPassword: z.string(),
    newPassword: z
      .string()
      .min(8, 'New password must be at least 8 characters long'),
    confirmPassword: z
      .string()
      .min(8, 'Confirm password must be at least 8 characters long')
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'New password and confirm password must match',
    path: ['confirmPassword'] // This ensures the error appears at the correct field
  });

export type IChangePasswordSchema = z.infer<typeof changePasswordSchema>;

// change password schema
export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, 'New password must be at least 8 characters long'),
    confirmPassword: z
      .string()
      .min(8, 'Confirm password must be at least 8 characters long')
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'New password and confirm password must match',
    path: ['confirmPassword'] // This ensures the error appears at the correct field
  });

export type IResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export const commonUserCreateSchema = z.object({
  fullName: fullNameSchema, // needs to check for two words
  phoneNumber: ethiopianPhoneNumberSchema.nullish(),
  userName: userNameSchema,
  password: z.string().min(8),
  email: emailSchema,
  role: z.enum(getEnumValues(UserRole) as [string, ...string[]]),
  providerId: z.string(),
  superAgentId: z.string().optional().nullable().nullish(),
  shopId: z.string().nullable().optional().nullish()
});

export type ICommonUserCreateSchema = z.infer<typeof commonUserCreateSchema>;

// cashier create schema extending common user create schema
export const cashierCreateSchema = commonUserCreateSchema.extend({
  shopId: z.string()
});

export type ICashierCreateSchema = z.infer<typeof cashierCreateSchema>;

export const updateUserSchema = z.object({
  fullName: fullNameSchema, // needs to check for two words

  lastName: lastNameSchema.optional(),
  phoneNumber: ethiopianPhoneNumberSchema.optional().nullable(),
  userName: userNameSchema.optional().nullable(),
  email: emailSchema,
  superAgentId: z.string().optional().nullable().nullish()
});

export type IUpdateUserSchema = z.infer<typeof updateUserSchema>;
