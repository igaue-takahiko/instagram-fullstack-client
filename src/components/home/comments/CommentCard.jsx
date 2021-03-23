import React, { useState , useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { updateComment, likeComment, unlikeComment } from '../../../redux/comment/actions';

import Avatar from '../../Avatar';
import LikeButton from '../../LikeButton';
import CommentMenu from './CommentMenu';

const CommentCard = ({ comment, post }) => {
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)

  const [ content, setContent ] = useState("")
  const [ readMore, setReadMore ] = useState(false)
  const [ isLike, setIsLike ] = useState(false)
  const [ onEdit, setOnEdit ] = useState(false)
  const [ loadLike, setLoadLike ] = useState(false)

  useEffect(() => {
    setContent(comment.content)
    if (comment.likes.find(like => like._id === auth.user._id)) {
      setIsLike(true)
    }
  },[auth.user._id, comment])

  const styleCard = {
    opacity: comment._id ? 1: 0.5,
    pointerEvents: comment._id ? "inherit" : "none"
  }

  const handleLike = () => {
    if (loadLike) {
      return
    }
    setIsLike(true)
    setLoadLike(true)
    dispatch(likeComment({ comment, post, auth }))
    setLoadLike(false)
  }

  const handleUnLike = () => {
    if (loadLike) {
      return
    }
    setIsLike(false)
    setLoadLike(true)
    dispatch(unlikeComment({ comment, post, auth }))
    setLoadLike(false)
  }

  const handleUpdate = () => {
    if (comment.content !== content) {
      dispatch(updateComment({ comment, post, content, auth }))
      setOnEdit(false)
    } else {
      setOnEdit(false)
    }
  }

  return (
    <div className="comment_card mt-2" style={styleCard}>
      <Link
        className="d-flex text-dark"
        to={`/profile/${comment.user._id}`}
      >
        <Avatar src={comment.user.avatar} size="small-avatar" />
        <h6 className="mx-1">{comment.user.username}</h6>
      </Link>
      <div className="comment_content">
        <div className="flex-fill">
          {
            onEdit
            ? <textarea
                rows="5" value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            : <div style={{ cursor: "pointer" }}>
                <span>
                  {
                    content.length < 100 ? content :
                    readMore ? content + " " : content.slice(0, 100) + "...."
                  }
                </span>
                {
                  content.length > 100 && (
                    <span
                      className="readMore"
                      onClick={() => setReadMore(!readMore)}
                    >
                      {readMore ? "Hide content" : "Read more"}
                    </span>
                  )
                }
              </div>
          }
          <div style={{ cursor: "pointer" }}>
            <small className="text-muted mr-3">
              {moment(comment.createAt).fromNow()}
            </small>
            <small className="font-weight-bold mr-3">
              {`${comment.likes.length} likes`}
            </small>
            {
              onEdit
              ? <>
                <small
                  className="font-weight-bold mr-3"
                  onClick={handleUpdate}
                >
                  Update
                </small>
                <small
                  className="font-weight-bold mr-3"
                  onClick={() => setOnEdit(false)}
                >
                  cancel
                </small>
              </>
              : <small className="font-weight-bold mr-3">
                  reply
                </small>
            }
          </div>
        </div>
        <div className="d-flex align-items-center mr-2">
          <CommentMenu post={post} comment={comment} auth={auth} setOnEdit={setOnEdit} />
          <LikeButton
            isLikes={isLike} handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
        </div>
      </div>
    </div>
  )
}

export default CommentCard
