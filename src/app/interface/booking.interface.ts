import { Types } from 'mongoose';

export interface TBooking {
  date: Date;
  startTime: string;
  endTime: string | null;
  user: Types.ObjectId;
  car: Types.ObjectId;
  totalCost: number;
}
