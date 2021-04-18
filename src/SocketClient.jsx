import React, { useEffect , useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { globalTypes } from './redux/globalState/types';
import { homePostTypes } from './redux/homePost/types';
import { notifyTypes } from './redux/notify/types';

import audioBell from './audio/audio_bell.mp3';

const spawnNotification = (body, icon, url, title) => {
  let options = {
    body,
    icon,
  }
  let n = new Notification(title, options)

  n.onclick = (e) => {
    e.preventDefault()
    window.open(url, "_blank")
  }
}

const SocketClient = () => {
  const dispatch = useDispatch()
  const audioRef = useRef()
  const { auth, socket, notify } = useSelector(state => state)

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

  //Notification
  useEffect(() => {
    socket.on('createNotifyToClient', msg => {
      dispatch({ type: notifyTypes.CREATE_NOTIFY, payload: msg })
      if (notify.sound) {
        audioRef.current.play()
      }
      spawnNotification(
        msg.user.username + " " + msg.text,
        msg.user.avatar,
        msg.url,
        "I-NETWORK"
      )
    })

    return () => socket.off('createNotifyToClient')
  },[auth, dispatch, notify.sound, socket])

  useEffect(() => {
    socket.on('removeNotifyToClient', msg => {
      dispatch({ type: notifyTypes.REMOVE_NOTIFY, payload: msg })
    })

    return () => socket.off('removeNotifyToClient')
  },[auth, dispatch, socket])

  return (
    <>
      <audio controls ref={audioRef} style={{ display: "none" }}>
        <source src={audioBell} type="audio/mp3" />
      </audio>
    </>
  )
}

export default SocketClient
