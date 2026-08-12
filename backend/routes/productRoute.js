import express from 'express';
import mongoose from 'mongoose';
import { cloudinary,storage } from '../config/Cloudinary.js';
import multer from 'multer';
import { createProduct, deleteProduct, getAllBestsellers, getAllCategories, getProductById, getProductBySlug,
getProducts, getProductsBySlugs, isBestsellerProducts, updateProduct }
 from '../controllers/productContoller.js';
import { validateUser } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/adminMiddleware.js';
import { wrapAsync } from '../utils/wrapAsyn.js';
const router = express.Router();
const upload = multer({storage : storage});




router.route('/category').get(wrapAsync(getAllCategories));
router.route('/products').get(wrapAsync(getProducts));
router.route('/by-slugs').get(wrapAsync(getProductsBySlugs));
router.route('/isBestseller').get(wrapAsync(isBestsellerProducts));
router.route('/getAllBestSellers').get(wrapAsync(getAllBestsellers));
router.route('/:slug').get(wrapAsync(getProductBySlug));

//admin controller
router.route('/createProduct').post(validateUser,isAdmin, upload.single('product_image'),wrapAsync(createProduct));
router.route('/productById/:id').get(validateUser, isAdmin,upload.single('product_image'),wrapAsync(getProductById));
router.route('/updateProduct/:id').patch(validateUser, isAdmin,upload.single('product_image'), wrapAsync(updateProduct));
router.route('/deleteProduct/:id').delete(validateUser, isAdmin, wrapAsync(deleteProduct));



export default router;