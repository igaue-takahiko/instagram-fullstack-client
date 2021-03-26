import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { deleteComment } from '../../../redux/post/actions';

const CommentMenu = ({ post, comment, setOnEdit }) => {
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)

  const handleRemoveComment = () => {
    if (post.user._id === auth.user._id || comment.user._id === auth.user._id) {
      dispatch(deleteComment({ post, comment, auth }))
    }
  }
  const MenuItem = () => (
    <>
      <div className="dropdown-item" onClick={() => setOnEdit(true)}>
        <span className="material-icons">create</span> Edit
      </div>
      <div className="dropdown-item" onClick={handleRemoveComment}>
        <span className="material-icons">delete_outline</span> Remove
      </div>
    </>
  )

  return (
    <div className="menu" style={{ cursor: "pointer" }}>
      {
        (post._id === auth.user._id || comment.user._id === auth.user._id) && (
          <div className="nav-item dropdown">
            <span className="material-icons" id="moreLink" data-toggle="dropdown">
              more_vert
            </span>
            <div className="dropdown-menu" aria-labelledby="moreLink">
              {
                post.user._id === auth.user._id
                ? comment.user._id === auth.user._id
                  ? MenuItem()
                  : <div className="dropdown-item" onClick={handleRemoveComment}>
                      <span className="material-icons">delete_outline</span> Remove
                    </div>
                : comment.user._id === auth.user._id && MenuItem()
              }
            </div>
          </div>
        )
      }
    </div>
  )
}

export default CommentMenu
