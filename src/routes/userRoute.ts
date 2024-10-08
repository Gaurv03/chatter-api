import { Router } from 'express';
import userController from '../controllers/userController';
import { isAuth } from '../middlewares';

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/getOtherUsers', isAuth, userController.getOtherUsers);

export default router