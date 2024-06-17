export interface TUser {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  phone: number;
  address: string;
}
