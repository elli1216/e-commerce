import express, { Router } from 'express';
import { getProducts, getCategories, getCartItems } from '../controllers/product.controller';

const router: Router = express.Router();

router.get('/products', getProducts);
router.get('/categories', getCategories);
router.get('/cart', getCartItems);

export default router;