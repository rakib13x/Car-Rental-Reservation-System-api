import { z } from 'zod';

export const createBookingValidationSchema = z.object({
  body: z.object({
    carId: z.string().min(1, 'Car ID is required'),
    date: z
      .string()
      .min(1, 'Date is required')
      .transform((val) => new Date(val)),
    startTime: z
      .string()
      .min(1, 'Start time is required')
      .regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, 'Invalid time format'),
  }),
});

export const updateBookingValidationSchema = z.object({
  body: z.object({
    endTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, {
        message: 'Invalid end time format! Must be in HH:mm format.',
      })
      .optional(),
    totalCost: z
      .number({ required_error: 'Total cost is required!' })
      .nonnegative({ message: 'Total cost must be a non-negative number!' })
      .default(0)
      .optional(),
  }),
});
