'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getComments, postComment } from '@/action/commentAction';
import { format } from 'timeago.js';

export default function CommentSection({ slug }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [update, setUpdate] = useState(false);
  // this function is helpful to post a new comment
  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    const newEntry = {
      slug: slug,
      user: session?.user?.id,
      comment: newComment,
    };

    try {
      const response = await postComment(newEntry);
      if (response.success) {
        console.log(response);
        setNewComment('');
        setUpdate(!update); // Toggle update state to refetch comments
      } else {
        console.error('Failed to post comment:', response.message);
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment. Please try again later.');
      return;
    }

  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getComments(slug);
        if (response.success) {
          setComments(response.data);
        } else {
          console.error('Failed to fetch comments:', response.message);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }
    fetchComments();
  }, [update]);


  return (
    <section className="mt-16">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        💬 Comments
      </h3>

      {/* Add Comment Form */}
      {session ? (
        <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-4 mb-8 shadow-sm">
          <textarea
            rows={4}
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full bg-white dark:bg-black text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-md p-4 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handlePostComment}
            className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            Post Comment
          </button>
        </div>
      )
        : <div className='mb-8'>
          Please <Link href={'/login'} className='text-blue-600 font-medium hover:italic'>login</Link> to post your comment.
        </div>
      }

      {/* Comments List */}
      {
        comments.length === 0 && (
          <div className="text-gray-500 dark:text-gray-400">
            No comments yet. Be the first to comment!
          </div>
        )
      }
      <div className="space-y-6">
        {
          comments.length > 0 && comments.map((comment) => (
            <div
              key={comment.id}
              className="flex gap-4 items-start bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <img
                src={comment.avatar}
                alt={comment.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{comment.username}</h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ">
                    {format(comment.postedAt)}
                  </span>
                </div>
                <p className="text-gray-800 dark:text-gray-200 mt-1 text-sm whitespace-pre-wrap">
                  {comment.comment}
                </p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
