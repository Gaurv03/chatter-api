import { Request, Response } from 'express';
import userService from '../services/userService';
import { statusCodes } from '../helpers';

const statusCode = new statusCodes();
class UserController {
    public async register(req: Request, res: Response) {
        try {
            const data = await userService.register(req, res);
            return statusCode.success(res, "Request Acknowledged", data)
        } catch (error: any) {
            console.log(error)
            // return statusCode.internalServerError(res, error)
        }
    }
    public async login(req: Request, res: Response) {
        try {
            const data = await userService.login(req, res);
            return statusCode.success(res, "Request Acknowledged", data)
        } catch (error: any) {
            console.log(error)
            // return statusCode.internalServerError(res, error)
        }
    }
    public async logout(req: Request, res: Response) {
        try {
            const data = await userService.logout(req, res);
            return statusCode.success(res, "Request Acknowledged", data)
        } catch (error: any) {
            console.log(error)
            // return statusCode.internalServerError(res, error)
        }
    }
    public async getOtherUsers(req: Request, res: Response) {
        try {
            const data = await userService.getOtherUsers(req, res);
            return statusCode.success(res, "Request Acknowledged", data)
        } catch (error: any) {
            console.log(error)
            // return statusCode.internalServerError(res, error)
        }
    }

}

export default new UserController();