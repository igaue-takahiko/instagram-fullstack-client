import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';

import Avatar from './Avatar';

const UserCard = ({ children, user, border, handleClose, setShowFollowers, setShowFollowing, msg }) => {
  const { theme } = useSelector(state => state)

  const handleAllClose = () => {
    if (handleClose) {
      handleClose()
    }

    if (setShowFollowers) {
      setShowFollowers(false)
    }

    if (setShowFollowing) {
      setShowFollowing(false)
    }
  }

  return (
    <div className={`d-flex p-2 align-items-center justify-content-between w-100 ${border}`}>
      <div>
        <Link
          className="d-flex align-items-center"
          to={`/profile/${user._id}`} onClick={handleAllClose}
        >
          <Avatar src={user.avatar} size="big-avatar" />
          <div className="ml-1" style={{ transform: "translateY(-2px)" }}>
            <span className="d-block">{user.username}</span>
            <small style={{ opacity: 0.7 }}>
              {
                msg
                ? <>
                    <div style={{ filter: theme ? "invert(1)" : "invert(0)" }}>
                      {user.text}
                    </div>
                    {user.media.length > 0 && (
                      <div>
                        {`${user.media.length} `}
                        <FontAwesomeIcon icon={faImage} />
                      </div>
                    )}
                  </>
                : user.fullName
              }
            </small>
          </div>
        </Link>
      </div>
      {children}
    </div>
  )
}

export default UserCard
