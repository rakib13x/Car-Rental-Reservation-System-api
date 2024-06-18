import { model, Schema } from 'mongoose';

const carSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    isElectric: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
      enum: ['available', 'not available'],
      default: 'available',
    },
    features: {
      type: [String],
      default: [],
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const carModel = model('Car', carSchema);
