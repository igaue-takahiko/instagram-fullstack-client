import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { globalTypes } from '../redux/globalState/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faImage } from '@fortawesome/free-solid-svg-icons';

const StatusModal = () => {
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)

  const [ content, setContent ] = useState("")

  const contentInput = useCallback((e) => {
    setContent(e.target.value)
  },[setContent])

  return (
    <div className="status_modal">
      <form>
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
            value={content} onChange={contentInput}
          />
          <div className="input_images">
            <FontAwesomeIcon icon={faCamera} cursor="pointer" size="2x" />
            <div className="file_update">
              <FontAwesomeIcon icon={faImage} cursor="pointer" size="2x" />
              <input
                type="file" name="file" id="file"
                multiple accept="image/*"
              />
            </div>
          </div>
          <div className="status_footer">
            <button className="btn btn-secondary w-100">
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default StatusModal
