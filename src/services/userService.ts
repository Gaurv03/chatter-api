// const bcrypt = require('bcrypt-ts');
// const bcrypt = require('bcrypt');
import bcrypt from 'bcrypt';
import { User } from "../models/userModel";

class UserService {

    public async register(req: any, res: any): Promise<Object> {
        let userData
        try {
            const { fullName, userName, password, confirmPassword, gender } = req.body;

            if (password !== confirmPassword) {
                return res.status(400).json({ message: "Password donot match" })
            }
            let userCheck = await User.findOne({ userName });
            if (userCheck) {
                return res.status(400).json({ message: "User already exist" })
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
        return { data: userData }
    }

}

export default new UserService();
