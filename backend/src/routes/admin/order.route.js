
import  { Router } from 'express';
import { getOrderById, getOrderOfALLUser, updateOrderStatus } from '../../controllers/admin/order.controller.js';

const router = Router();

router.get('/get-orders',getOrderOfALLUser)
router.get('/get/:orderId',getOrderById)
router.put('/update-status/:orderId/:orderStatus',updateOrderStatus)


export default router;