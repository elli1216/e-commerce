import express from "express";
import multer from "multer";
import {
  getProducts,
  getCategories,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { storage } from "../middlewares/multer.middleware";

const upload = multer({ storage });

const router: express.Router = express.Router();

router.get("/products", getProducts);
router.get("/categories", getCategories);
router.post("/add-product", upload.single("productImage"), addProduct);
router.get("/products/:id", getProductById);
router.put("/edit-product/:id", updateProduct);
router.delete("/delete-product/:id", deleteProduct);

export default router;
