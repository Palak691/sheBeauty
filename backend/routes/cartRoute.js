import express from 'express';
import { validateUser } from '../middleware/authMiddleware.js';
import { addToCart, getCart, removeCart, selectGift, updateCart } from '../controllers/cartController.js';
import { wrapAsync } from '../utils/wrapAsyn.js';
const router = express.Router();

router.route('/addToCart').post(validateUser ,wrapAsync(addToCart));
router.route('/getCart').get(validateUser, wrapAsync(getCart));
router.route('/updateCart').put(validateUser, wrapAsync(updateCart));
router.route('/giftId').post(validateUser,wrapAsync(selectGift));
router.route('/:productId').delete(validateUser, wrapAsync(removeCart));

export default router;
