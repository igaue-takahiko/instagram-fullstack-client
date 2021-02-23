import React from 'react'
import { Link } from 'react-router-dom';
import Avatar from './Avatar';

const UserCard = ({ user, border, handleClose }) => {

  const handleAllClose = () => {
    if (handleClose) {
      handleClose()
    }
  }

  return (
    <div className={`d-flex p-2 align-items-center ${border}`}>
      <div>
        <Link
        className="d-flex align-items-center"
          to={`/profile/${user._id}`} onClick={handleAllClose}
        >
          <Avatar src={user.avatar} size="big-avatar" />
          <div className="ml-1" style={{ transform: "translateY(-2px)" }}>
            <span className="d-block">{user.name}</span>
            <small style={{ opacity: 0.7 }}>{user.fullName}</small>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default UserCard
