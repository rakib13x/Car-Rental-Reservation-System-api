import { Types } from 'mongoose';

export interface TBooking {
  date: Date;
  user: Types.ObjectId;
  car: Types.ObjectId;
  startTime: string;
  endTime: string;
  totalCost: number;
  isDeleted: boolean;
}
