import { z } from 'zod';

export const createBookingValidationSchema = z.object({
  body: z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'Invalid date format! Must be in YYYY-MM-DD format.',
    }),
    user: z.string(),
    car: z.string(),
    startTime: z.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, {
      message: 'Invalid start time format! Must be in HH:mm format.',
    }),
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
