import express from 'express';
import { validateUser } from '../middleware/authMiddleware.js';
import { getAllGifts } from '../controllers/giftController.js';
import { wrapAsync } from '../utils/wrapAsyn.js';
const router = express.Router();



router.route('/getAllGifts').get(wrapAsync(getAllGifts));


export default router;
