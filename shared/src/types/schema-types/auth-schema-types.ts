import { z } from 'zod';
import { ActiveStatus } from '@/types';
import { getEnumValues } from '../../utils/helpers';

export const loginSchema = z.object({
  userName: z.string({ message: 'Enter a valid user name' }),
  password: z.string({ message: 'Enter a valid password' })
});

export type UserLoginValue = z.infer<typeof loginSchema>;

// change status schema
export const changeStatusSchema = z.object({
  status: z.enum(getEnumValues(ActiveStatus) as [string, ...string[]])
});

export type IChangeStatusSchema = z.infer<typeof changeStatusSchema>;

// change user profile schema
export const changeUserProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 characters long'),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  country: z.string()
});

export type IChangeUserProfileSchema = z.infer<typeof changeUserProfileSchema>;
