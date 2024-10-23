import { Router } from 'express';
import messageController from '../controllers/messageController';
import { isAuth } from '../middlewares';

const router = Router();

router.post('/send/:id', isAuth, messageController.sendMessage);
router.post('/get/:id', isAuth, messageController.getMessage);

export default router