import { TCar } from '../interface/car.interface';
import { carModel } from '../models/car.model';

const createCarsIntoDB = async (car: TCar) => {
  const result = await carModel.create(car);
  return result;
};

export const CarServices = {
  createCarsIntoDB,
};
