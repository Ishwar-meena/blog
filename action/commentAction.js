'use server';

import connectDB from "@/db/connectDB";
import { Comment } from "@/models/Comment";


export async function postComment(commentData) {
    try {
        await connectDB();
        const result = await Comment.create(commentData);
        return { success: true, message: 'Comment posted successfully' };
    } catch (error) {
        console.error('Error posting comment:', error);
        return { success: false, message: 'Failed to post comment' };
    }
}

export async function getComments(slug) {
    try {
        await connectDB();
        const comments = await Comment.find({ slug })
            .sort({ time: -1 })
            .populate('user', 'username avatar'); 
        if (!comments || comments.length === 0) {
            return { success: false, message: 'No comments found' };
        }
        // Format comments to include user details
        const formattedComments = comments.map(comment => ({
            id: comment._id.toString(),
            username: comment.user.username,
            avatar: comment.user.avatar,
            comment: comment.comment,
            postedAt: comment.time.toString(),
        }));
        return { success: true, data: formattedComments };
    } catch (error) {
        console.error('Error fetching comments:', error);
        return { success: false, message: 'Failed to fetch comments' };
    }
}