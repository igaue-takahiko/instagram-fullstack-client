import React from 'react'
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';

const LikeButton = ({ isLikes, handleLike, handleUnLike }) => {
  const { theme } = useSelector(state => state)

  return (
    <>
      {
        isLikes
        ? <FontAwesomeIcon
            className="text-danger"
            icon={fasHeart} onClick={handleUnLike}
            cursor="pointer" size="lg"
            style={{
              margin: 12,
              filter: `${theme ? "invert(1)" : "invert(0)"}`
            }}
          />
        : <FontAwesomeIcon
            icon={farHeart} onClick={handleLike}
            cursor="pointer" size="lg"
            style={{
              margin: 12,
              filter: `${theme ? "invert(1)" : "invert(0)"}`
            }}
          />
      }
    </>
  )
}

export default LikeButton
