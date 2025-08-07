import express from 'express';
import { authMiddleware } from '../../controllers/auth/auth.controller.js';
import { addProduct, deleteProduct, getAllProducts, getProductById, handleImage, updateProduct } from '../../controllers/admin/product.controller.js';
import { upload } from '../../helpers/cloudinary.js';

const router = express.Router();

router.post('/upload-product-image',upload.single('my_file'),handleImage);

router.post('/add-product',addProduct);

router.get("/get-all-products",getAllProducts);

router.delete("/delete-product/:id",deleteProduct);

router.put("/update-product/:id",updateProduct);

router.get('/get-product/:id',getProductById);

export default router;