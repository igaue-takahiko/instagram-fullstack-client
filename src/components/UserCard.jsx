import React from 'react'
import Avatar from './Avatar';

const UserCard = ({ user, border }) => {
  return (
    <div className={`d-flex p-2 align-items-center ${border}`}>
      <Avatar src={user.avatar} size="big-avatar" />
      <div className="ml-1" style={{ transform: "translateY(-2px)" }}>
        <span className="d-block">{user.name}</span>
        <small style={{ opacity: 0.7 }}>{user.fullName}</small>
      </div>
    </div>
  )
}

export default UserCard