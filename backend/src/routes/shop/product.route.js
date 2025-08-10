import express from "express";
import { getFilteredProducts, getProductById } from "../../controllers/shop/product.controller.js";

const router = express.Router();

router.get("/get-filtered-products", getFilteredProducts); 
router.get("/get-product/:id",getProductById); 


export default router;