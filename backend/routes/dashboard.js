import express from 'express';
import { getdashboardData } from '../controllers/dasboardController.js';
import { wrapAsync } from '../utils/wrapAsyn.js';
import { validateUser } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();



router.route('/dashboard').get(validateUser,isAdmin, wrapAsync(getdashboardData));


export default router;
