import express, { Router } from "express";
import { addAddress, deleteAddress, fetchedAllAddress, updateAddress } from "../../controllers/shop/address.controller.js";



const router = Router();

router.post("/add", addAddress);
router.get("/get/:userId", fetchedAllAddress);
router.put("/update/:userId/:addressId", updateAddress);
router.delete("/delete/:userId/:addressId", deleteAddress);


export default router;