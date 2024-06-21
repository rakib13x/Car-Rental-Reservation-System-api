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
      required: true,
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: 'Car',
      required: true,
    },
    startTime: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) =>
          /^([01]\d|2[0-3]):?([0-5]\d)$/.test(value),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        message: (props: any) =>
          `${props.value} is not a valid 24-hour time format!`,
      },
    },
    endTime: {
      type: String,
      default: null,
    },
    totalCost: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const BookingModel = model<TBooking>('Booking', bookingSchema);
