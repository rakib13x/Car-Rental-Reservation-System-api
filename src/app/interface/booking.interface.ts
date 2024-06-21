import { Types } from 'mongoose';

export interface TBooking {
  date: Date;
  user: Types.ObjectId;
  car: Types.ObjectId;
  startTime: string;
  endTime: string | null;
  totalCost: number;
  isDeleted: boolean;
}
