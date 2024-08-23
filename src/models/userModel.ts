import mongoose from "mongoose";

const userModel = new mongoose.Schema({

    fullName: { type: String, require: true },
    userName: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    profilePic: { type: String, default: "" },
    gender: { type: String, enum: ["male", "female"], required: true },

}, { timestamps: true })

export const User = mongoose.model("User", userModel)