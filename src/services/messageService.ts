import bcrypt from 'bcrypt';
import { User } from "../models/userModel";
import { statusCodes } from '../helpers';
import { Conversation } from '../models/conversationModel';
import { Message } from '../models/messageModel';
var jwt = require('jsonwebtoken');

const statusCode = new statusCodes();
class MessageService {

    public async sendMessage(req: any, res: any): Promise<Object> {
        let userData
        try {
            let senderId = req.userId, receiverId = req.params.id, message = req.body.message;
            console.log(senderId)
            console.log(receiverId)
            console.log(message)
            let gotConversation = await Conversation.findOne({
                participants: { $all: [senderId, receiverId] }
            })
            if (!gotConversation) {
                gotConversation = await Conversation.create({
                    participants: [senderId, receiverId]
                })
            }
            const newMsg = await Message.create({
                senderId,
                receiverId,
                message
            })

            if (newMsg) {
                gotConversation.messages.push(newMsg._id)
            }
            await gotConversation.save()

        } catch (error) {
            console.log(error)
            throw new Error('Error creating item: ' + error);
        }
        return { userData }
    }
}

export default new MessageService();
