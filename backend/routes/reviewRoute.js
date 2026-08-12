import express from 'express';
import mongoose from 'mongoose';
import { validateUser } from '../middleware/authMiddleware.js';
import { addReview, deleteReview, editReview, getAllReview, getReviewByProductId } from '../controllers/reviewController.js';
import { wrapAsync } from '../utils/wrapAsyn.js';
const router = express.Router();


router.route('/all').get( wrapAsync(getAllReview));
router.route('/new').post(validateUser, wrapAsync(addReview));
router.route('/:productId').get(validateUser,wrapAsync(getReviewByProductId));
router.route('/:id').delete(validateUser,wrapAsync(deleteReview));
router.route('/:id').put(validateUser, wrapAsync(editReview));

export default router;