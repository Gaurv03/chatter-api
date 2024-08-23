import { Request, Response } from 'express';
import userService from '../services/userService';

class UserController {
    public async register(req: Request, res: Response): Promise<void> {
        try {
            const data = await userService.register(req, res);
            res.status(201).json(data);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

}

export default new UserController();