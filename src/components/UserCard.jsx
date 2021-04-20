import React from 'react'
import { Link } from 'react-router-dom';
import Avatar from './Avatar';

const UserCard = ({ children, user, border, handleClose, setShowFollowers, setShowFollowing }) => {

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
            <small style={{ opacity: 0.7 }}>{user.fullName}</small>
          </div>
        </Link>
      </div>
      {children}
    </div>
  )
}

export default UserCard
