import express from 'express';
import { CarControllers } from '../../controllers/car.controller';

const router = express.Router();

router.post('/', CarControllers.createCars);
router.get('/', CarControllers.getAllCars);
router.get('/:carId', CarControllers.getSingleCar);

export const CarRoutes = router;
