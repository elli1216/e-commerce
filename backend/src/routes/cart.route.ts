import express, { Router, Request, Response } from 'express';
import {
  getCartItems,
  addToCart,
  increaseQuantity,
  decreaseQuantity
} from '../controllers/cart.controller';

const router: Router = express.Router();

router.get('/cart', getCartItems);

router.post('/cart/add', addToCart);
router.post('/cart/increase', increaseQuantity);
router.post('/cart/decrease', decreaseQuantity);

export default router;