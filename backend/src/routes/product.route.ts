import express from 'express';
import {
  getProducts,
  getCategories,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller';

const router = express.Router();

router.get('/products', getProducts);
router.get('/categories', getCategories);
router.post('/add-product', addProduct);
router.get('/products/:id', getProductById);
router.put('/edit-product/:id', updateProduct);
router.delete('/delete-product/:id', deleteProduct);

export default router;