import mongoose from "mongoose";
import { generateChatForUser, generateContextForCode } from "../config/ai.config.js";
import chatModel from "../models/chat.model.js";


export const googleCodeReviewController = async (req, res) => {
    try {
        const loggedInuser = req.user._id;

        const { code } = req.body;

        if (!loggedInuser) {
            return res.status(400).json({ success: false, message: "User is not loggedIn" });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInuser)) {
            return res.status(400).json({ success: false, message: "Invalid Id" });
        };

        if (!code) {
            return res.status(400).json({ success: false, message: "Code not found" });
        };

        const result = await generateContextForCode(code);

        if (!result) {
            return res.status(400).json({ success: false, message: "Error Occured from Open Ai" });
        };

        return res.status(200).send(result);


    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    };
};

export const chatWithAiController = async (req, res) => {
    try {
        const loggedInuser = req.user._id;

        const { chat } = req.body;

        if (!loggedInuser) {
            return res.status(400).json({ success: false, message: "User is not loggedIn" });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInuser)) {
            return res.status(400).json({ success: false, message: "Invalid Id" });
        };

        if (!chat) {
            return res.status(400).json({ success: false, message: "Input Chat Box is Empty" });
        };

        const result = await generateChatForUser(chat);

        if (!result) {
            return res.status(400).json({ success: false, message: "Error Occured from Open Ai" })
        };

        const newChat = new chatModel({
            chat,
            response: result,
            user: loggedInuser
        });

        const savedData = await newChat.save();

        return res.status(200).json({ success: true, message: "AI response generated", data: savedData });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
    }
};

export const allChatWithAiController = async (req, res) => {
    try {
        const loggedInuser = req.user._id;

        if (!loggedInuser) {
            return res.status(400).json({ success: false, message: "User is not loggedIn" });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInuser)) {
            return res.status(400).json({ success: false, message: "Invalid Id" });
        };

        const allChats = await chatModel.find({ user: loggedInuser }).sort({ createdAt: -1 });

        if (!allChats || allChats.length === 0) {
            return res.status(400).json({ success: false, message: "No Chats Available" });
        };

        return res.status(200).json({ success: true, message: "Your Chats with AI", data: allChats });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    };
};