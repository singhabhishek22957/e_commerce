import express, { Router } from "express";
import { addAddress, deleteAddress, fetchedAllAddress, getAddressById, updateAddress } from "../../controllers/shop/address.controller.js";



const router = Router();

router.post("/add", addAddress);
router.get("/get/:userId", fetchedAllAddress);
router.put("/update/:userId/:addressId", updateAddress);
router.delete("/delete/:userId/:addressId", deleteAddress);
router.get("/get-address/:addressId", getAddressById);


export default router;