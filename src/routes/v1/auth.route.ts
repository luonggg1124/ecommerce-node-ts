import express from 'express';
import { login, logout, sendCode, signup } from '../../controllers/auth.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const authRoutes = express.Router();


authRoutes.post('/login',login);
authRoutes.post('/signup',signup);
authRoutes.post('/logout',authMiddleware,logout);
authRoutes.post('/send-verification-code',sendCode);
export default authRoutes;
