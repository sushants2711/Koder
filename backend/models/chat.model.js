import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    chat: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Chat", chatSchema);