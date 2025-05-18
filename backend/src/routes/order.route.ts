import express, { Router } from 'express';
import { getOrders, addOrder } from '../controllers/order.controller';

const router: Router = express.Router();

router.get('/orders', getOrders);

router.post('/order', addOrder);

export default router;