import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBellSlash, faCircle } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';

import { isReadNotify, deleteAllNotifies } from '../redux/notify/actions';
import { notifyTypes } from '../redux/notify/types';

import NoNotice from '../images/NoNotifice.png';
import Avatar from './Avatar';

const NotifyModal = () => {
  const dispatch = useDispatch()
  const { auth, notify } = useSelector(state => state)

  const handleIsRead = (msg) => {
    dispatch(isReadNotify({ msg, auth }))
  }

  const handleSound = () => {
    dispatch({ type: notifyTypes.UPDATE_SOUND, payload: !notify.sound })
  }

  const handleDeleteAll = () => {
    const newArr = notify.data.filter((item) => item.isRead === false)
    if (newArr.length === 0) {
      return dispatch(deleteAllNotifies(auth.token))
    }

    if (window.confirm(`You have ${newArr.length} unread notices. Are you sure you want to delete all?`)) {
      return dispatch(deleteAllNotifies(auth.token))
    }
  }

  return (
    <div style={{ minWidth: 240 }}>
      <div className="d-flex justify-content-between align-items-center px-3">
        <h3>Notification</h3>
        {
          notify.sound
          ? <FontAwesomeIcon
              className="text-danger" icon={faBell} cursor="pointer"
              size="lg" onClick={handleSound}
            />
          : <FontAwesomeIcon
              className="text-danger" icon={faBellSlash} cursor="pointer"
              size="lg" onClick={handleSound}
            />
        }
      </div>
      <hr className="mt-0" />
      {
        notify.data.length === 0 && (
          <img src={NoNotice} alt="NoNotice" className="w-100" />
        )
      }
      <div style={{ maxHeight: "calc(100vh - 180px)", overflow: "auto" }}>
        {notify.data.map((msg, index) => (
          <div key={index} className="px-2 mb-3">
            <Link
              to={`${msg.url}`} className="d-flex text-dark align-items-center"
              onClick={() => handleIsRead(msg)}
            >
              <Avatar src={msg.user.avatar} size="big-avatar" />
              <div className="mx-1 flex-fill">
                <div>
                  <strong className="mr-1">{msg.user.username}</strong>
                  <span>{msg.text}</span>
                </div>
                {msg.content && <small>{msg.content.slice(0, 20)}...</small>}
              </div>
              <div style={{ width: 32 }}>
                {msg.image && (
                  <Avatar src={msg.image} size="medium-avatar" />
                )}
              </div>
            </Link>
            <small className="text-muted d-flex justify-content-between px-2">
              {moment(msg.createdAt).fromNow()}
              {
                !msg.isRead && (
                  <FontAwesomeIcon icon={faCircle} className="text-primary" />
                )
              }
            </small>
          </div>
        ))}
      </div>
      <hr className="my-1" />
      <div
        className="text-right text-danger mr-2" style={{ cursor: "pointer" }}
        onClick={handleDeleteAll}
      >
        Delete All
      </div>
    </div>
  )
}

export default NotifyModal
