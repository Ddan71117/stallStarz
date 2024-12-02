import express from 'express';
import { login, signup, verifyToken } from '../controllers/authController';
import { auth } from '../middleware/auth';

const authRouter = express.Router();

// Auth routes
authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.get('/verify', auth, verifyToken);

export default authRouter;
