import express from 'express';
import mongoose from 'mongoose';
import { cloudinary, storage } from '../config/Cloudinary.js';
import multer from 'multer';
import { deleteUser, getAllUsers, getUserAndProfile, getUserById, login, register,  updateUserProfileData, uploadProfilePicture } from '../controllers/userController.js';
import { validateUser } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/adminMiddleware.js';
import { wrapAsync } from '../utils/wrapAsyn.js';
const router = express.Router();
const upload = multer({storage : storage});


router.route('/signup').post(wrapAsync(register));
router.route('/login').post(wrapAsync(login));
router.route('/upload_ProfilePicture').post(validateUser, upload.single('profilePicture'),wrapAsync(uploadProfilePicture));
router.route('/get_User_And_Profile').get(validateUser, wrapAsync(getUserAndProfile));
router.route('/update_UserProfileData').post(validateUser, wrapAsync(updateUserProfileData));


//admin
router.route('/admin/getAllUsers').get(validateUser, isAdmin, wrapAsync(getAllUsers));
router.route('/admin/getUserById/:id').get(validateUser, isAdmin, wrapAsync(getUserById));
router.route('/admin/deleteUser/:id',).delete(validateUser, isAdmin,wrapAsync(deleteUser));



export default router;