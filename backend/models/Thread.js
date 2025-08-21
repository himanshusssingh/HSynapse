import mongoose, { Schema } from "mongoose";

const MessageSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ["user", "assistant"],
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const ThreadSchama = new mongoose.Schema({
    threadId: {
        type: String,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true,
        default: "New Chat"
    },
    message: [MessageSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Thread", ThreadSchama);