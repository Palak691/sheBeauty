import express from 'express';
import mongoose from 'mongoose';
import { cloudinary, storage } from '../config/Cloudinary.js';
import multer from 'multer';
import { validateUser } from '../middleware/authMiddleware.js';
import { addToWishlist, getWishlist, removeWishlist } from '../controllers/wishlistController.js';
import { wrapAsync } from '../utils/wrapAsyn.js';
const router = express.Router();
const upload = multer({storage : storage});


router.route('/addToWishlist').post(validateUser,wrapAsync(addToWishlist));
router.route('/getWishlist').get(validateUser,wrapAsync(getWishlist));
router.route('/:productId').delete(validateUser,wrapAsync(removeWishlist));


export default router;