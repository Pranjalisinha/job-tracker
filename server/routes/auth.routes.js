import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller.js';
import { errorHandler } from '../middleware/error.handler.js';

const router = express.Router();

router.post('/register', registerUser, errorHandler);
router.post('/login', loginUser, errorHandler);

export default router;