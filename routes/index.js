import express from 'express'
import authRoute from './authRoutes.js'
import userRoute from './userRoutes.js'
import postRoutes from './postRoutes.js';

const router = express.Router();

router.use(`/auth`,authRoute);  //auth/register
router.use(`/user`,userRoute);
router.use(`/posts`, postRoutes);

export default router;