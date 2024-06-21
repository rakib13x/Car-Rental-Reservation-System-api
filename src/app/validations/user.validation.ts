import { z } from 'zod';

export const createUserValidationSchema = z.object({
  _id: z.string(),
  name: z.string().min(5, { message: 'Name is Required!' }),
  email: z.string().min(8, { message: 'email is required!' }),
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be more than 20 characters' }),
  role: z.enum(['user', 'admin']).default('user'),
  phone: z.number().min(11, { message: 'phone number must be a number' }),
  address: z.string().min(2, { message: 'address must be a string' }),
});
