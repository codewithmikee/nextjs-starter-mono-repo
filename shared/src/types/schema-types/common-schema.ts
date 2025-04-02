import { z } from 'zod';
import { ActiveStatus } from '@/types';

export const ActiveStatusSchema = z
  .enum([ActiveStatus.ACTIVE, ActiveStatus.IN_ACTIVE])
  .optional();

export const toggleStatusSchema = z.object({
  status: z.enum([ActiveStatus.ACTIVE, ActiveStatus.IN_ACTIVE])
});

export type ToggleStatusSchema = z.infer<typeof toggleStatusSchema>;
