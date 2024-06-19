import { z } from 'zod';

export const createBookingValidationSchema = z.object({
  date: z.date({
    required_error: 'Booking date is required!',
    invalid_type_error: 'Invalid date format!',
  }),
  user: z.string(),
  car: z.string(),
  startTime: z.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, {
    message: 'Invalid start time format! Must be in HH:mm format.',
  }),
  endTime: z.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, {
    message: 'Invalid end time format! Must be in HH:mm format.',
  }),
  totalCost: z
    .number({ required_error: 'Total cost is required!' })
    .nonnegative({ message: 'Total cost must be a non-negative number!' })
    .default(0),
});
