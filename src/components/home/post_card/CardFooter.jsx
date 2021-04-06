import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faBookmark } from '@fortawesome/free-regular-svg-icons';

import Send from '../../../images/send.svg';
import LikeButton from '../../LikeButton';
import ShareModal from '../../ShareModal';
import { likePost, unLikePost } from '../../../redux/homePost/actions';
import { BASE_URL } from '../../../utils/config';

const CardFooter = ({ post }) => {
  const dispatch = useDispatch()
  const { auth, theme } = useSelector(state => state)

  const [ isLikes, setIsLikes ] = useState(false)
  const [ loadLike, setLoadLike ] = useState(false)
  const [ isShare, setIsShare ] = useState(false)

  useEffect(() => {
    if (post.likes.find(like => like._id === auth.user._id)) {
      setIsLikes(true)
    }
  },[auth.user._id, post.likes])

  const handleLike = () => {
    if (loadLike) {
      return
    }
    setIsLikes(true)
    setLoadLike(true)
    dispatch(likePost({ post, auth }))
    setLoadLike(false)
  }

  const handleUnLike = () => {
    if (loadLike) {
      return
    }
    setIsLikes(false)
    setLoadLike(true)
    dispatch(unLikePost({ post, auth }))
    setLoadLike(false)
  }

  return (
    <div className="card_footer">
      <div className="card_icon_menu">
        <div>
          <LikeButton
            isLikes={isLikes}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
          <Link className="text-dark" to={`/post/${post._id}`}>
            <FontAwesomeIcon
              icon={faComment} cursor="pointer" size="lg"
              style={{ margin: 12 }}
            />
          </Link>
          <img
            style={{ cursor: "pointer" }}
            src={Send} alt="send" onClick={() => setIsShare(!isShare)}
          />
        </div>
        <FontAwesomeIcon
          icon={faBookmark} cursor="pointer" size="lg"
          style={{ margin: 12 }}
        />
      </div>
      <div className="justify-content-between d-flex">
        <h6 style={{ padding: "0 32px", cursor: "pointer" }}>
            {`${post.likes.length} likes`}
        </h6>
        <h6 style={{ padding: "0 24px", cursor: "pointer" }}>
          {`${post.comments.length} comments`}
        </h6>
      </div>
      {isShare && (
        <ShareModal url={`${BASE_URL}/post/${post._id}`} theme={theme} />
      )}
    </div>
  )
}

export default CardFooter
