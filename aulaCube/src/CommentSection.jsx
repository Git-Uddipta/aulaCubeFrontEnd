// CommentSectionComponent.js

import React, { useState } from 'react'
import './CommentSection.css' // Import your CSS file

const CommentSectionComponent = () => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')

  const handlePostComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, { text: newComment, replies: [] }])
      setNewComment('')
    }
  }

  const handleDeleteComment = (commentIndex) => {
    const updatedComments = [...comments]
    const deletedComment = updatedComments.splice(commentIndex, 1)[0]
    deleteReplies(deletedComment.replies)
    setComments(updatedComments)
  }

  const deleteReplies = (replies) => {
    for (const reply of replies) {
      deleteReplies(reply.replies)
    }
  }

  const handleReply = (commentIndex, replyText) => {
    const updatedComments = [...comments]
    if (updatedComments[commentIndex].replies.length < 3) {
      updatedComments[commentIndex].replies.push({ text: replyText })
    }
    setComments(updatedComments)
  }

  return (
    <div className="comment-section">
      <h1>What's On Your Mind</h1>
      <input
        type="text"
        placeholder="Write a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handlePostComment}>Post Comment</button>

      {comments.map((comment, commentIndex) => (
        <div key={commentIndex} className="comment">
          <p>{comment.text}</p>
          <button onClick={() => handleDeleteComment(commentIndex)}>
            Delete Comment
          </button>

          {comment.replies.map((reply, replyIndex) => (
            <div key={replyIndex} className="reply">
              <p>{reply.text}</p>
            </div>
          ))}

          {comment.replies.length < 3 && (
            <input
              type="text"
              placeholder="Reply to this comment..."
              onBlur={(e) => handleReply(commentIndex, e.target.value)}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default CommentSectionComponent
