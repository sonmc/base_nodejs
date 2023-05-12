import { Router } from 'express';
import { verifyToken } from '../user-case/auth-middleware';
import { getCurrentUser } from '../user-case/user/user.ctrl';

const router = Router();
router.get('/get', verifyToken, getCurrentUser);

export default router;
