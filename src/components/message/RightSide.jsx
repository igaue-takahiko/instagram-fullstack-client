import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import { UserCard } from '../../components';
import MessageDisplay from './MessageDisplay';

const RightSide = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { auth, message } = useSelector(state => state)

  const [ user, setUser ] = useState([])
  const [ text, setText ] = useState("")

  useEffect(() => {
    const newUser = message.users.find((user) => user._id === id)
    if (newUser) {
      setUser(newUser)
    }
  },[id, message.users])

  return (
    <>
      <div className="message_header">
        <UserCard user={user}>
          <FontAwesomeIcon icon={faTrashAlt} className="text-danger" />
        </UserCard>
      </div>
      <div className="chat_container">
        <div className="chat_display">
          <div className="chat_row other_message">
            <MessageDisplay user={user} />
          </div>
          <div className="chat_row you_message">
            <MessageDisplay user={auth.user} />
          </div>
        </div>
      </div>
      <form className="chat_input">
        <input
          type="text" placeholder="Enter you message..."
          value={text} onChange={e => setText(e.target.value)}
        />
        <button
          className="material-icons" type="submit"
          disabled={text ? false : true}
        >
          near_me
        </button>
      </form>
    </>
  )
}

export default RightSide
