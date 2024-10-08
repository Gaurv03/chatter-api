import bcrypt from 'bcrypt';
import { User } from "../models/userModel";
import { statusCodes } from '../helpers';
var jwt = require('jsonwebtoken');

const statusCode = new statusCodes();
class UserService {

    public async register(req: any, res: any): Promise<Object> {
        let userData
        try {
            const { fullName, userName, password, confirmPassword, gender } = req.body;

            if (password !== confirmPassword) {
                return statusCode.badRequest(res, "Password does not match")
            }
            let userCheck = await User.findOne({ userName });
            if (userCheck) {
                return statusCode.badRequest(res, "User already exist")
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const femaleProfile = `https://avatar.iran.liara.run/public/girl?username=${userName}`
            const maleProfile = `https://avatar.iran.liara.run/public/boy?username=${userName}`


            userData = await User.create({
                fullName,
                userName,
                password: hashedPassword,
                profilePic: gender == "male" ? maleProfile : femaleProfile,
                gender
            })

        } catch (error) {
            console.log(error)
            throw new Error('Error creating item: ' + error);
        }
        return { userData }
    }

    public async login(req: any, res: any): Promise<any> {
        let userCheck, token
        try {
            const { userName, password } = req.body;

            userCheck = await User.findOne({ userName });
            if (!userCheck) {
                return statusCode.badRequest(res, "User not found")
            } else {
                const userPassword = userCheck.password as string;
                const passwordCheck = await bcrypt.compare(password, userPassword)
                if (!passwordCheck) {
                    return statusCode.badRequest(res, "Incorrect password")
                }
            }

            userCheck.password = undefined;
            const tokenData = {
                userId: userCheck._id,
                userName: userCheck.userName,
                fullName: userCheck.fullName
            }
            token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' })
            res.cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" })
        } catch (error) {
            console.log(error)
            throw new Error('Error creating item: ' + error);
        }
        return { userCheck }
    }

    public async logout(req: any, res: any): Promise<any> {
        let userCheck, token
        try {
            res.cookie("token", "", { maxAge: 0, httpOnly: true, sameSite: "strict" })
        } catch (error) {
            console.log(error)
            throw new Error('Error creating item: ' + error);
        }
        return "Logged Out"
    }

    public async getOtherUsers(req: any, res: any): Promise<any> {
        let userList
        try {
            const loggedInUser = req.userId
            userList = await User.find({ _id: { $ne: loggedInUser } }).select("-password");

        } catch (error) {
            console.log(error)
            throw new Error('Error creating item: ' + error);
        }
        return { userList }
    }

}

export default new UserService();
