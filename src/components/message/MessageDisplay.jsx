import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import Avatar from '../Avatar';
import { imagesShow, videoShow } from '../../utils/mediaShow';
import { deleteMessages } from '../../redux/message/actions';

const MessageDisplay = ({ user, msg, theme, data }) => {
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)

  const handleDeleteMessages = () => {
    if (data) {
      return
    }

    if (window.confirm("Do you want to delete?")){
      dispatch(deleteMessages({ msg, data, auth }))
    }
  }

  return (
    <>
      <div className="chat_title">
        <Avatar src={user.avatar} size="small-avatar" />
        <span>{user.username}</span>
      </div>
      <div className="you_content">
        {user._id === auth.user._id && (
          <FontAwesomeIcon
            icon={faTrashAlt} className="text-danger" cursor="pointer" size="lg"
            style={{
              position: "absolute",
              top: "50%",
              left: "-24px",
              transform: "translateY(-50%)",
            }}
            onClick={handleDeleteMessages}
          />
        )}
        <div>
          {msg.text && (
            <div
              className="chat_text"
              style={{ filter: theme ? "invert(1)" : "invert(0)" }}
            >
              {msg.text}
            </div>
          )}
          {msg.media.map((item, index) => (
            <div key={index}>
              {
                item.url.match(/video/i)
                ? videoShow(item.url, theme)
                : imagesShow(item.url, theme)
              }
            </div>
          ))}
        </div>
      </div>
      <div className="chat_time">
        {new Date(msg.createdAt).toLocaleString()}
      </div>
    </>
  )
}

export default MessageDisplay
