import { z } from 'zod';

const userValidationSchema = z.object({
  name: z.string().min(5, { message: 'Name is Required!' }),
  email: z.string().min(8, { message: 'email is required!' }),
  pasword: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be more than 20 characters' })
    .optional(),
  role: z.enum(['user', 'admin']).default('user'),
  phone: z.number().min(11, { message: 'phone number must be a number' }),
  address: z.string().min(2, { message: 'address must be a string' }),
});

export const UserValidation = {
  userValidationSchema,
};
