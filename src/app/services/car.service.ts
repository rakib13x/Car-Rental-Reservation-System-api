import { TCar } from '../interface/car.interface';
import { carModel } from '../models/car.model';

const createCarsIntoDB = async (car: TCar) => {
  const result = await carModel.create(car);
  return result;
};

const getAllCarsFromDb = async (regex?: RegExp) => {
  try {
    const result = regex
      ? await carModel.find({ name: { $regex: regex } })
      : await carModel.find();

    return result;
  } catch (error: any) {
    throw new Error('Error fetching products: ' + error.message);
  }
};

export const CarServices = {
  createCarsIntoDB,
  getAllCarsFromDb,
};
