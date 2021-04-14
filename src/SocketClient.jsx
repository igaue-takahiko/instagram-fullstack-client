import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { homePostTypes } from './redux/homePost/types';
import { globalTypes } from './redux/globalState/types';

const SocketClient = () => {
  const dispatch = useDispatch()
  const { auth, socket } = useSelector(state => state)

  //joinUser
  useEffect(() => {
    socket.emit('joinUser', auth.user._id)
  },[auth.user._id, socket])

  //likes
  useEffect(() => {
    socket.on('likeToClient', newPost => {
      dispatch({ type: homePostTypes.UPDATE_POST, payload: newPost })
    })

    return () => socket.off('likeToClient')
  },[dispatch, socket])

  //unLikes
  useEffect(() => {
    socket.on('unLikeToClient', newPost => {
      dispatch({ type: homePostTypes.UPDATE_POST, payload: newPost })
    })

    return () => socket.off('unLikeToClient')
  },[dispatch, socket])

  //Comments
  useEffect(() => {
    socket.on('createCommentToClient', newPost => {
      dispatch({ type: homePostTypes.UPDATE_POST, payload: newPost })
    })

    return () => socket.off('createCommentToClient')
  },[dispatch, socket])

  useEffect(() => {
    socket.on('deleteCommentToClient', newPost => {
      dispatch({ type: homePostTypes.UPDATE_POST, payload: newPost })
    })

    return () => socket.off('deleteCommentToClient')
  },[dispatch, socket])

  //Follow
  useEffect(() => {
    socket.on('followToClient', newUser => {
      dispatch({ type: globalTypes.AUTH, payload: { ...auth, user: newUser } })
    })

    return () => socket.off('followToClient')
  },[auth, dispatch, socket])

  useEffect(() => {
    socket.on('unFollowToClient', newUser => {
      dispatch({ type: globalTypes.AUTH, payload: { ...auth, user: newUser } })
    })

    return () => socket.off('unFollowToClient')
  },[auth, dispatch, socket])

  return <></>
}

export default SocketClient
