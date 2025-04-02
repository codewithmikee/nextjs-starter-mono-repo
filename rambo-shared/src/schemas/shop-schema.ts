import { getEnumValues } from '@shared/utils/helpers';
import { z } from 'zod';
import { ActiveStatus, OddType } from '@/types';

export const riskPolicySchema = z.object({
  minBetAmount: z.number(),
  maxBetAmount: z.number(),
  maxWinAmountPerTicket: z.number(),
  maxWinAmountPerDay: z.number()
});

export const shopCreateSchema = z.object({
  name: z.string().min(3),
  address: z.string().nullish(),
  agentId: z.string().nullish(),
  withDefaultCashiers: z.boolean().optional(),
  cashierPassword: z.string().optional().nullable().nullish(),
  oddType: z
    .enum(getEnumValues(OddType) as [string, ...string[]]) // Cast to tuple type
    .nullish(), // Allows the field to be null
  riskPolicy: riskPolicySchema.optional() // Allow riskPolicy to be optional
});
export type IShopCreateSchema = z.infer<typeof shopCreateSchema>;

export const shopUpdateSchema = z.object({
  name: z.string().nullish(),
  address: z.string().nullish(),
  agentId: z.string().nullish(),
  oddType: z
    .enum(getEnumValues(OddType) as [string, ...string[]]) // Cast to tuple type
    .nullish(), // Allows the field to be null
  riskPolicy: riskPolicySchema.optional() // Allow riskPolicy to be optional
});

export type IShopUpdateSchema = z.infer<typeof shopUpdateSchema>;
