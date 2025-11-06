import express from 'express';
import { addProduct, listProduct, removeProduct } from '../controller/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRoutes = express.Router();

// Add product (only admin can add)
productRoutes.post(
  '/addproduct',
  adminAuth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ]),
  addProduct
);

// List all products
productRoutes.get('/list', listProduct);

// Remove a product (only admin can remove)
productRoutes.delete('/remove/:id', adminAuth, removeProduct);

export default productRoutes;
