import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faImage } from '@fortawesome/free-regular-svg-icons';
import { faPhone, faVideo } from '@fortawesome/free-solid-svg-icons';

import { UserCard } from '../../components';
import MessageDisplay from './MessageDisplay';
import Icons from '../Icons';
import LoadIcon from '../../images/load-icon.gif';

import { globalTypes } from '../../redux/globalState/types';
import { addMessage, getMessages, loadMoreMessages, deleteConversation } from '../../redux/message/actions';
import { imagesShow, videoShow } from '../../utils/mediaShow';
import { imageUpload } from '../../utils/imageUpdated';

const RightSide = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const refDisplay = useRef()
  const pageEnd = useRef()
  const { id } = useParams()
  const { auth, message, theme, socket } = useSelector(state => state)

  const [ user, setUser ] = useState([])
  const [ text, setText ] = useState("")
  const [ media, setMedia ] = useState([])
  const [ loadMedia, setLoadMedia ] = useState(false)
  const [ page, setPage ] = useState([])
  const [ data, setData ] = useState([])
  const [ result, setResult ] = useState(0)
  const [ isLoadMore, setIsLoadMore ] = useState(0)

  useEffect(() => {
    const newData = message.data.find(item => item._id === id)
    if (newData) {
      setData(newData.messages)
      setResult(newData.result)
      setPage(newData.page)
    }
  },[id, message.data])

  useEffect(() => {
    if (id && message.users.length > 0) {
      setTimeout(() => {
        refDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" })
      },50)

      const newUser = message.users.find((user) => user._id === id)
      if (newUser) {
        setUser(newUser)
      }
    }
  },[id, message.users])

  useEffect(() => {
    const getMessagesData = async () => {
      if (message.data.every(item => item._id !== id)) {
        await dispatch(getMessages({ auth, id }))
        setTimeout(() => {
          refDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" })
        },50)
      }
    }
    getMessagesData()
  },[auth, dispatch, id, message.data])

   //Load More
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsLoadMore(p => p + 1)
      }
    },{
      threshold: 0.1
    })

    observer.observe(pageEnd.current)
  },[setIsLoadMore])

  useEffect(() => {
    if (isLoadMore > 1) {
      if (result >= page * 9) {
        dispatch(loadMoreMessages({ auth, id, page: page + 1 }))
        setIsLoadMore(1)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isLoadMore])

  const handleChangeMedia = (e) => {
    const files = [ ...e.target.files ]
    let error = ""
    let newMedia = []
    files.forEach((file) => {
      if (!file) {
        return error = "File does not exist."
      }
      if (file.size > 1024 * 1024 * 5) {
        return error = "The image/video largest is 5mb."
      }
      return newMedia.push(file)
    })

    if (error) {
      dispatch({ type: globalTypes.ALERT, payload: { error: error } })
    }
    setMedia([ ...media, ...newMedia ])
  }

  const handleDelete = (index) => {
    const newArr = [ ...media ]
    newArr.splice(index, 1)
    setMedia(newArr)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim() && media.length === 0) {
      return
    }
    setText("")
    setMedia([])
    setLoadMedia(true)

    let newArr = []
    if (media.length > 0) {
      newArr = await imageUpload(media)
    }

    const msg = {
      sender: auth.user._id,
      recipient: id,
      text,
      media: newArr,
      createdAt: new Date().toISOString()
    }
    setLoadMedia(false)
    dispatch(addMessage({ msg, auth, socket }))
    if (refDisplay.current) {
      refDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }

  const handleDeleteConversation = () => {
    if (window.confirm("Do you want to delete?")) {
      dispatch(deleteConversation({ auth, id }))
      return history.push("/message")
    }
  }

  //Call
  const caller = ({ video }) => {
    const { _id, avatar, username, fullName } = user
    const msg = {
      sender: auth.user._id,
      recipient: _id,
      avatar,
      username,
      fullName,
      video
    }
    dispatch({ type: globalTypes.CALL, payload: msg })
  }

  const handleAudioCall = () => {
    caller({ video: false })
  }

  const handleVideoCall = () => {
    caller({ video: true })
  }

  return (
    <>
      <div className="message_header">
        {user.length !== 0 && (
          <UserCard user={user}>
            <div>
            <FontAwesomeIcon
                icon={faPhone}
                cursor="pointer"
                onClick={handleAudioCall}
              />
              <FontAwesomeIcon
                icon={faVideo} className="mx-3"
                cursor="pointer"
                onClick={handleVideoCall}
              />
              <FontAwesomeIcon
                icon={faTrashAlt} className="text-danger"
                cursor="pointer"
                onClick={handleDeleteConversation}
              />
            </div>
          </UserCard>
        )}
      </div>
      <div
        className="chat_container"
        style={{ height: media.length > 0 ? "calc(100vh - 336px)" : "" }}
      >
        <div className="chat_display" ref={refDisplay}>
          <button style={{ marginTop: "-24px", opacity: 0 }} ref={pageEnd}>
            Load more
          </button>
          {data.map((msg, index) => (
            <div key={index}>
              {msg.sender !== auth.user._id && (
                <div className="chat_row other_message">
                  <MessageDisplay user={user} msg={msg} theme={theme} />
                </div>
              )}
              {msg.sender === auth.user._id && (
                <div className="chat_row you_message">
                  <MessageDisplay user={auth.user} msg={msg} theme={theme} data={data} />
                </div>
              )}
            </div>
          ))}
          {loadMedia && (
            <div className="chat_row other_message">
              <img src={LoadIcon} alt="loading"/>
            </div>
          )}
        </div>
      </div>
      <div
        className="show_media"
        style={{ display: media.length > 0 ? "grid" : "none" }}
      >
        {media.map((item, index) => (
          <div key={index} id="file_media">
            {
              item.type.match(/video/i)
              ? videoShow(URL.createObjectURL(item), theme)
              : imagesShow(URL.createObjectURL(item), theme)
            }
            <span onClick={() => handleDelete(index)}>&times;</span>
          </div>
        ))}
      </div>
      <form className="chat_input" onSubmit={handleSubmit}>
        <input
          type="text" placeholder="Enter you message..."
          value={text} onChange={e => setText(e.target.value)}
          style={{
            filter: theme ? "invert(1)" : "invert(0)",
            background: theme ? "#040404" : "",
            color: theme ? "#fff" : ""
          }}
        />
        <Icons setContent={setText} content={text} theme={theme} />
        <div className="file_upload">
          <FontAwesomeIcon icon={faImage} className="text-danger" />
          <input
            type="file" name="file" id="file"
            multiple accept="image/*,video/*"
            onChange={handleChangeMedia}
          />
        </div>
        <button
          className="material-icons" type="submit"
          disabled={(text || media.length > 0) ? false : true}
        >
          near_me
        </button>
      </form>
    </>
  )
}

export default RightSide
