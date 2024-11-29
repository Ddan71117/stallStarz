import express from 'express';
import { login, signup, verifyToken } from '../controllers/authController';
import { auth } from '../middleware/auth';
const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
router.get('/verify', auth, verifyToken);
export default router;
//# sourceMappingURL=authRoutes.js.map