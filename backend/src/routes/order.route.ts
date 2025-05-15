import express, { Router } from 'express';
import { getOrders } from '../controllers/order.controller';

const router: Router = express.Router();

router.get('/orders', getOrders);

export default router;