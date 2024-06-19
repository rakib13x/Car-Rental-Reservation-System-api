/* eslint-disable @typescript-eslint/no-explicit-any */

import { Schema, model } from 'mongoose';
import { TBooking } from '../interface/booking.interface';

const bookingSchema = new Schema<TBooking>(
  {
    date: {
      type: Date,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
      required: true,
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: 'Car',
      unique: true,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) =>
          /^([01]\d|2[0-3]):?([0-5]\d)$/.test(value),
        message: (props: any) =>
          `${props.value} is not a valid 24-hour time format!`,
      },
    },
    endTime: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) =>
          /^([01]\d|2[0-3]):?([0-5]\d)$/.test(value),
        message: (props: any) =>
          `${props.value} is not a valid 24-hour time format!`,
      },
    },
    totalCost: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true },
);

export const BookingModel = model<TBooking>('Booking', bookingSchema);
