import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { follow, unFollow } from '../redux/profile/actions';

const FollowBtn = ({ user }) => {
  const dispatch = useDispatch()
  const { auth, profile } = useSelector(state => state)

  const [ followed, setFollowed ] = useState(false)

  useEffect(() => {
    if (auth.user.following.find(item => item._id === user._id)) {
      setFollowed(true)
    }
  },[auth.user.following, user._id])

  const handleFollow = () => {
    setFollowed(true)
    dispatch(follow({ users: profile.users, user, auth }))
  }

  const handleUnFollow = () => {
    setFollowed(false)
    dispatch(unFollow({ users: profile.users, user, auth }))
  }

  return (
    <>
    {
      followed
      ? <button
          className="btn btn-outline-danger"
          onClick={handleUnFollow}
        >
          UnFollow
        </button>
      : <button
          className="btn btn-outline-info"
          onClick={handleFollow}
        >
          Follow
        </button>
    }
    </>
  )
}

export default FollowBtn
