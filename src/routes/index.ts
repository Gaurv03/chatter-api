// routes/index.ts
import { Router } from 'express';
import userRoute from './userRoute';
import messageRoute from './messageRoute';

const router = Router();

// Register routes
router.use('/users', userRoute);
router.use('/message', messageRoute);

export default router;