import { z } from 'zod';

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(5, { message: 'Name is Required!' }),
    email: z.string().min(8, { message: 'email is required!' }),
    role: z.enum(['user', 'admin']),
    password: z
      .string({
        invalid_type_error: 'Password must be string',
      })
      .max(20, { message: 'Password can not be more than 20 characters' }),
    phone: z
      .string()
      .min(10, { message: 'phone number is less than 10 character' }),
    address: z.string().min(2, { message: 'address must be a string' }),
  }),
});
