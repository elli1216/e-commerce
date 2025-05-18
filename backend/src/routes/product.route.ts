import express, { Router, Request, Response } from 'express';
import {
  getProducts,
  getCategories,
  getCartItems,
  addToCart,
  increaseQuantity,
  decreaseQuantity
} from '../controllers/product.controller';

const router: Router = express.Router();

router.get('/products', getProducts);
router.get('/categories', getCategories);
router.get('/cart', getCartItems);

router.post('/cart/add', addToCart);
router.post('/cart/increase', increaseQuantity);
router.post('/cart/decrease', decreaseQuantity);

export default router;