import express, { Router } from "express";
import {
  capturePayment,
  createOrder,
  createOrderWithStripe,
  getOrderById,
  getOrderByUser,
} from "../../controllers/shop/order.controller.js";

const router = Router();

router.post("/create-order", createOrder);
router.post("/create-stripe-order", createOrderWithStripe);
router.get("/stripe-session/:sessionId", capturePayment);
router.get("/get-order/:userId", getOrderByUser);
router.get("/get-order-by-id/:orderId", getOrderById);

export default router;
