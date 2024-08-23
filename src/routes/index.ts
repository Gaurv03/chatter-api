// routes/index.ts
import { Router } from 'express';
import userRoute from './userRoute';

const router = Router();

// Register routes
router.use('/users', userRoute);

export default router;