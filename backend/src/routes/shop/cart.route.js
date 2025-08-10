import express, { Router } from "express";
import {
  addToCart,
  deleteCartItem,
  fetchCartItem,
  updateCartItem,
} from "../../controllers/shop/cartController.js";

const router = Router();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItem);
router.put("/update-cart", updateCartItem);
router.delete("/delete/:userId/:productId", deleteCartItem);

export default router;
