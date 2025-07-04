import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        index: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: {
        type: String,
        required: true,
        trim: true,
    },
    time: {
        type: Date,
        default: Date.now,
    },
});

export const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);