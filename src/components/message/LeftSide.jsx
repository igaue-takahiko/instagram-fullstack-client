import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

import { globalTypes } from '../../redux/globalState/types';
import { addUser } from '../../redux/message/actions';
import { getDataAPI } from '../../utils/fetchData';

import UserCard from '../UserCard';

const LeftSide = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()
  const { auth, message } = useSelector(state => state)

  const [ search, setSearch ] = useState("")
  const [ searchUsers, setSearchUsers ] = useState([])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!search) {
      return setSearchUsers([])
    }

    try {
      const res = await getDataAPI(`search?username=${search}`, auth.token)
      setSearchUsers(res.data.users)
    } catch (error) {
      dispatch({
        type: globalTypes.ALERT,
        payload: { error: error.response.data.msg }
      })
    }
  }

  const handleAddUser = (user) => {
    setSearch("")
    setSearchUsers([])
    dispatch(addUser({ user, message }))
    return history.push(`/message/${user._id}`)
  }

  const isActive = (user) => {
    if (id === user._id) {
      return "active"
    }
    return ""
  }

  return (
    <>
      <form className="message_header" onSubmit={handleSearch}>
        <input
          type="text" value={search} placeholder="Enter to Search..."
          onChange={e => setSearch(e.target.value)}
        />
        <button type="submit" style={{ display: "none" }}>Search</button>
      </form>
      <div className="message_chat_list">
        {
          searchUsers.length !== 0
          ? <>
              {searchUsers.map((user) => (
                <div
                  key={user._id} className={`message_user ${isActive(user)}`}
                  onClick={() => handleAddUser(user)}
                >
                  <UserCard user={user} />
                </div>
              ))}
            </>
          : <>
          {
            message.users.map((user) => (
              <div
                key={user._id} className={`message_user ${isActive(user)}`}
                onClick={() => handleAddUser(user)}
              >
                <UserCard user={user}>
                  <FontAwesomeIcon icon={faCircle} size="lg" className="circle" />
                </UserCard>
              </div>
            ))
          }
            </>
        }
      </div>
    </>
  )
}

export default LeftSide
