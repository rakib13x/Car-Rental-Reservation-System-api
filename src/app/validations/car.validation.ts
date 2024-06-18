import { z } from 'zod';

export const createCarValidationSchema = z.object({
  name: z.string().min(2, { message: 'Car name is required!' }),
  description: z.string().min(5, { message: 'Car description is required!' }),
  color: z.string().min(3, { message: 'Car color is required!' }),
  isElectric: z.boolean(),
  status: z.enum(['available', 'not available']).default('available'),
  features: z.array(z.string()).optional(),
  pricePerHour: z.number({ message: 'price is required!' }),
  isDeleted: z.boolean().default(false),
});
