import { TCar } from '../interface/car.interface';
import { CarModel } from '../model/car.model';

const createCarsIntoDB = async (car: TCar) => {
  const result = await CarModel.create(car);
  return result;
};

const getAllCarsFromDb = async (regex?: RegExp) => {
  try {
    const result = regex
      ? await CarModel.find({ name: { $regex: regex } })
      : await CarModel.find();

    return result;
  } catch (error: any) {
    throw new Error('Error fetching products: ' + error.message);
  }
};

const getSingleCarFromDb = async (id: string) => {
  const result = await CarModel.findById(id);
  return result;
};

export const CarServices = {
  createCarsIntoDB,
  getAllCarsFromDb,
  getSingleCarFromDb,
};