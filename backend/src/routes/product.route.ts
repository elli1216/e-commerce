import express, { Router } from 'express';
import { getProducts, getCategories } from '../controllers/product.controller';

const router: Router = express.Router();

router.get('/products', getProducts);
router.get('/categories', getCategories);

export default router;