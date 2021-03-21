import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { createComment } from '../../redux/comment/actions';

const InputComment = ({ children, post }) => {
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)

  const [ content, setContent ] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!content.trim()) {
      return
    }

    setContent("")
    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString()
    }
    dispatch(createComment(post, newComment, auth ))
  }

  return (
    <form
      className="card-footer comment_input"
      onSubmit={handleSubmit}
    >
      {children}
      <input
        type="text" placeholder="Add your comments..."
        value={content} onChange={e => setContent(e.target.value)}
      />
      <button className="postBtn" type="submit">
        Post
      </button>
    </form>
  )
}

export default InputComment
