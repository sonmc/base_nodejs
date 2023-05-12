import { Router } from 'express';
import { verifyToken } from '../use-case/auth-middleware';
import { getCurrentUser } from '../use-case/user/user.ctrl';

const router = Router();
router.get('/get', verifyToken, getCurrentUser);

export default router;
