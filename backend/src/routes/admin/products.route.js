import express from 'express';
import { authMiddleware } from '../../controllers/auth/auth.controller.js';
import { handleImage } from '../../controllers/admin/product.controller.js';
import { upload } from '../../helpers/cloudinary.js';

const router = express.Router();

router.post('/upload-product-image',upload.single('my_file'),authMiddleware,handleImage);



export default router;