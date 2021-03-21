import React from 'react'
import { CommentsDisplay } from './comments/index';

const Comments = ({ post }) => {
  return (
    <div className="comments">
      {post.comments.map((comment) => (
        <CommentsDisplay key={comment._id} comment={comment} post={post} />
      ))}
    </div>
  )
}

export default Comments
