import mongoose from "mongoose";
import { generateContextForCode } from "../config/ai.config.js";

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

        const result = await generateContextForCode(code);

        if (!result) {
            return res.status(400).json({ success: false, message: "Error Occured from Open Ai" });
        };

        return res.status(200).send(result);


    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    };
};