import React from 'react'

import Avatar from '../Avatar';

const MessageDisplay = ({ user }) => {
  return (
    <>
      <div className="chat_title">
        <Avatar src={user.avatar} size="small-avatar" />
        <span>{user.username}</span>
        <div className="chat_text">
          aaaaaaaaa
        </div>
        <div className="chat_time">
          2021
        </div>
      </div>
    </>
  )
}

export default MessageDisplay
