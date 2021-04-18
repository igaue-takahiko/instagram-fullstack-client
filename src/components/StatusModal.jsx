import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faImage } from '@fortawesome/free-solid-svg-icons';

import { globalTypes } from '../redux/globalState/types';
import { createPost, updatePost } from '../redux/homePost/actions';

const StatusModal = () => {
  const dispatch = useDispatch()
  const { auth, theme, status, socket } = useSelector(state => state)

  const videoRef = useRef()
  const refCanvas = useRef()

  const [ content, setContent ] = useState("")
  const [ images, setImages ] = useState([])
  const [ stream, setStream ] = useState(false)
  const [ tracks, setTracks ] = useState("")

  const contentChangeInput = useCallback((e) => {
    setContent(e.target.value)
  },[setContent])

  const handleChangeImages = (e) => {
    const files = [ ...e.target.files ]
    let error = ""
    let newImages = []

    files.forEach((file) => {
      if (!file) {
        return error = "File does not exist."
      }
      if (file.type !== "image/jpeg" && file.type !== "image/jpg" && file.type !== "image/png") {
        return error = "Image format is incorrect."
      }
      return newImages.push(file)
    })

    if (error) {
      dispatch({ type: globalTypes.ALERT, payload: { error: error } })
    }
    setImages([ ...images, ...newImages ])
  }

  const deleteImages = (index) => {
    const newArr = [ ...images ]
    newArr.splice(index, 1)
    setImages(newArr)
  }

  const handleStream = () => {
    setStream(true)
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((mediaStream) => {
        videoRef.current.srcObject = mediaStream
        videoRef.current.play()
        const track = mediaStream.getTracks()
        setTracks(track[0])
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  const handleCapture = () => {
    const width = videoRef.current.clientWidth
    const height = videoRef.current.clientHeight

    refCanvas.current.setAttribute("width", width)
    refCanvas.current.setAttribute("height", height)

    const ctx = refCanvas.current.getContext("2d")
    ctx.drawImage(videoRef.current, 0, 0, width, height)
    let URL = refCanvas.current.toDataURL()
    setImages([ ...images, { camera: URL } ])
  }

  const handleStopStream = () => {
    tracks.stop()
    setStream(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (images.length === 0) {
      return dispatch({
        type: globalTypes.ALERT,
        payload: { error: "Please add your photo." }
      })
    }

    if (status.onEdit) {
      dispatch(updatePost({ content, images, auth, status }))
    } else {
      dispatch(createPost({ content, images, auth, socket }))
    }

    setContent("")
    setImages([])
    if (tracks) {
      tracks.stop()
    }
    dispatch({ type: globalTypes.STATUS, payload: false })
  }

  useEffect(() => {
    if (status.onEdit) {
      setContent(status.content)
      setImages(status.images)
    }
  },[status])

  return (
    <div className="status_modal">
      <form onSubmit={handleSubmit}>
        <div className="status_header">
          <h5 className="m-0">Create Post</h5>
          <span
            onClick={() => dispatch({ type: globalTypes.STATUS, payload: false })}
          >
            &times;
          </span>
        </div>
        <div className="status_body">
          <textarea
            name="content" placeholder={`${auth.user.username}, what are you thinking?`}
            value={content} onChange={contentChangeInput}
          />
          <div className="show_images">
            {images.map((image, index) => (
              <div key={index} id="file_img">
                <img
                  className="img-thumbnail"
                  style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                  src={
                    image.camera
                    ? image.camera
                    : image.url ? image.url : URL.createObjectURL(image)
                  }
                  alt="images"
                />
                <span onClick={() => deleteImages(index)}>
                  &times;
                </span>
              </div>
            ))}
          </div>
          {
            stream &&
            <div className="stream position-relative">
              <video
                style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                src="" autoPlay muted ref={videoRef} width="100%" height="100%"
              />
              <span onClick={handleStopStream}>
                &times;
              </span>
              <canvas ref={refCanvas} style={{ display: "none" }} />
            </div>
          }
          <div className="input_images">
            {
              stream
              ? <FontAwesomeIcon
                  icon={faCamera} cursor="pointer" size="2x"
                  onClick={handleCapture}
                />
              : <>
                  <FontAwesomeIcon
                    icon={faCamera} cursor="pointer" size="2x"
                    onClick={handleStream}
                  />
                  <div className="file_update">
                    <FontAwesomeIcon icon={faImage} cursor="pointer" size="2x" />
                    <input
                      type="file" name="file" id="file"
                      multiple accept="image/*"
                      onChange={handleChangeImages}
                    />
                  </div>
                </>
            }
          </div>
          <div className="status_footer">
            <button className="btn btn-secondary w-100" type="submit">
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default StatusModal
