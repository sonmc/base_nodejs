import { Router } from 'express';
import { login, refreshToken, logout } from '../user-case/auth/auth.ctrl';
import { verifyToken } from '../user-case/auth-middleware';
import { getCurrentUser } from '../user-case/user/user.ctrl';

const router = Router();

router.post('/login', login);
router.get('/logout', verifyToken, logout);
router.get('/refresh', verifyToken, refreshToken);
router.get('/get-current-user', verifyToken, getCurrentUser);

export default router;
