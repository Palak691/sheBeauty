import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { validateUser } from '../middleware/authMiddleware.js';
import { createOrder, getAllCustomerOrders, getCustomerOrderbyId, getMyOrder, getOrderById, getOrderHistory, updateCustomerOrderStatus } from '../controllers/orderController.js';
import { wrapAsync } from '../utils/wrapAsyn.js';
import { isAdmin } from '../middleware/adminMiddleware.js';
import { generateInvoice } from '../controllers/invoiceController.js';
const router = express.Router();



router.route('/createOrder').post(validateUser ,wrapAsync(createOrder))
router.route('/getMyOrders').get(validateUser, wrapAsync(getMyOrder));
router.route('/getOrderHistory').get(validateUser, wrapAsync(getOrderHistory))
router.route('/:id').get(validateUser, wrapAsync(getOrderById));


//admin
router.route('/admin/getCustomerOrders').get(validateUser, isAdmin, wrapAsync(getAllCustomerOrders))
router.route('/admin/updateCustomerOrderStatus/:id').post(validateUser, isAdmin, wrapAsync(updateCustomerOrderStatus))
router.route('/admin/getCustomerOrderById/:id').get(validateUser,isAdmin, wrapAsync(getCustomerOrderbyId))
//pdf
router.route('/:orderId/invoice').get(validateUser,wrapAsync(generateInvoice))

export default router;