import { Request, Response } from 'express';
import messageService from '../services/messageService';
import { statusCodes } from '../helpers';

const statusCode = new statusCodes();
class MessageController {
    public async sendMessage(req: Request, res: Response) {
        try {
            const data = await messageService.sendMessage(req, res);
            return statusCode.success(res, "Request Acknowledged", data)
        } catch (error: any) {
            console.log(error)
            // return statusCode.internalServerError(res, error)
        }
    }

    public async getMessage(req: Request, res: Response) {
        try {
            const data = await messageService.getMessage(req, res);
            return statusCode.success(res, "Request Acknowledged", data)
        } catch (error: any) {
            console.log(error)
            // return statusCode.internalServerError(res, error)
        }
    }
}

export default new MessageController();