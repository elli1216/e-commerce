import express, { Router } from 'express';
import { getProducts } from '../controllers/product.controller';

const router: Router = express.Router();

router.get('/products', getProducts);

export default router;