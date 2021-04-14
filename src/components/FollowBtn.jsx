import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { follow, unFollow } from '../redux/profile/actions';

const FollowBtn = ({ user }) => {
  const dispatch = useDispatch()
  const { auth, profile, socket } = useSelector(state => state)

  const [ followed, setFollowed ] = useState(false)
  const [ load, setLoad ] = useState(false)

  useEffect(() => {
    if (auth.user.following.find(item => item._id === user._id)) {
      setFollowed(true)
    }

    return () => setFollowed(false)
  },[auth.user.following, user._id])

  const handleFollow = () => {
    if (load) {
      return
    }
    setLoad(true)
    setFollowed(true)
    dispatch(follow({ users: profile.users, user, auth, socket }))
    setLoad(false)
  }

  const handleUnFollow = () => {
    if (load) {
      return
    }
    setFollowed(false)
    setLoad(true)
    dispatch(unFollow({ users: profile.users, user, auth, socket }))
    setLoad(false)
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
