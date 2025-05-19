import express, { Router, Request, Response } from 'express';
import {
  getProducts,
  getCategories,
  addProduct,
} from '../controllers/product.controller';

const router: Router = express.Router();

router.get('/products', getProducts);
router.get('/categories', getCategories);
router.post('/add-product', addProduct);

export default router;