import express from 'express';
import { USER_ROLE } from '../../constants/user.constant';
import { CarControllers } from '../../controllers/car.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/', CarControllers.createCars);
router.get('/', CarControllers.getAllCars);
router.get('/:carId', CarControllers.getSingleCar);
router.put('/:carId', auth(USER_ROLE.admin), CarControllers.updateCar);

export const CarRoutes = router;
