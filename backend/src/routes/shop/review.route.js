import {Router} from "express";
import { addProductReview, getProductReview } from "../../controllers/shop/productReview.controller.js";



const router = Router();


router.post("/add", addProductReview);
router.get("/get/:productId", getProductReview);


export default router;