import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

import { globalTypes } from '../../redux/globalState/types';
import { messageTypes } from '../../redux/message/types';
import { getConversations } from '../../redux/message/actions';
import { getDataAPI } from '../../utils/fetchData';

import UserCard from '../UserCard';

const LeftSide = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()
  const pageEnd = useRef()
  const { auth, message, online } = useSelector(state => state)

  const [ search, setSearch ] = useState("")
  const [ searchUsers, setSearchUsers ] = useState([])
  const [ page, setPage ] = useState(0)

  useEffect(() => {
    if (message.firstLoad) {
      return
    }
    dispatch(getConversations({ auth }))
  },[auth, dispatch, message.firstLoad])

  //Load More
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(p => p + 1)
      }
    },{
      threshold: 0.1
    })

    observer.observe(pageEnd.current)
  },[setPage])

  useEffect(() => {
    if (message.resultUsers >= (page - 1) * 9 && page > 1) {
      dispatch(getConversations({ auth, page }))
    }
  },[auth, dispatch, message.resultUsers, page])

  //Check User Online - Offline
  useEffect(() => {
    if (message.firstLoad) {
      dispatch({ type: messageTypes.CHECK_ONLINE_OFFLINE, payload: online })
    }
  },[dispatch, message.firstLoad, online])

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
    dispatch({
      type: messageTypes.ADD_USER,
      payload: { ...user, text: "", media: [] }
    })
    dispatch({ type: messageTypes.CHECK_ONLINE_OFFLINE, payload: online })
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
                    <UserCard user={user} msg={true}>
                      {
                        user.online
                        ? <FontAwesomeIcon icon={faCircle} size="lg" className="circle text-success" />
                        : auth.user.following.find(item => item._id === user._id) && (
                          <FontAwesomeIcon icon={faCircle} size="lg" className="circle" />
                        )
                      }
                    </UserCard>
                  </div>
                ))
              }
            </>
        }
        <button ref={pageEnd} style={{ opacity: 0 }}>Load more</button>
      </div>
    </>
  )
}

export default LeftSide
