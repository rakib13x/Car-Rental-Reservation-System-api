import express from 'express';
import { CarControllers } from '../../controllers/car.controller';

const router = express.Router();

router.post('/', CarControllers.createCars);
router.get('/', CarControllers.getAllCars);

export const CarRoutes = router;
