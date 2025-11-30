import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    projectLanguage: {
        type: String,
        enum: ["Python", "Java", "Cpp", "JavaScript", "C", "go", "bash"],
        required: true
    },
    code: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Project", projectSchema)