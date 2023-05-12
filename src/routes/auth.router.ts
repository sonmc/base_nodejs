import { Router } from "express";
import { login } from "../user-case/auth/auth.ctrl";

const router = Router();

router.post("/login", login);

export default router;
