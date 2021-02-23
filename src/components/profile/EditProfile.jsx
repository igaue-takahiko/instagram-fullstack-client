import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

import { checkImage } from '../../utils/imageUpdated';
import { globalTypes } from '../../redux/globalTypes';

const initialState = {
  fullName: "",
  mobile: "",
  address: "",
  website: "",
  story: "",
  gender: "",
}

const EditProfile = ({ setOnEdit }) => {
  const dispatch = useDispatch()
  const { auth, theme } = useSelector(state => state)

  const [ userData, setUserData ] = useState(initialState)
  const [ avatar, setAvatar ] = useState("")

  const { fullName, mobile, address, website, story } = userData

  useEffect(() => {
    setUserData(auth.user)
  },[auth.user])

  const handleChangeInput = useCallback((e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  },[userData])

  const changeAvatar = (e) => {
    const file = e.target.files[0]
    const err = checkImage(file)
    if (err) {
      return dispatch({ type: globalTypes.ALERT, payload: { error: err } })
    }
    setAvatar(file)
  }

  return (
    <div className="edit_profile">
      <button
        className="btn btn-danger btn_close"
        onClick={() => setOnEdit(false)}
      >
        Close
      </button>
      <form >
        <div className="info_avatar">
          <img
            style={{filter: theme ? "invert(1)" : "invert(0)"}}
            src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
            alt="avatarImage"
          />
          <span>
            <FontAwesomeIcon icon={faCamera} />
            <p>Change</p>
            <input
              type="file" name="file" id="file_up" accept="image/*"
              onChange={changeAvatar}
            />
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <div className="position-relative">
            <input
              className="form-control"
              type="text" id="fullName" name="fullName"
              value={fullName} onChange={handleChangeInput}
            />
            <small
              className="text-danger position-absolute"
              style={{ top: "50%", right: "5px", transform: "translateY(-50%)" }}
            >
              {`${fullName.length}/25`}
            </small>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input
            className="form-control"
            type="text" id="mobile" name="mobile"
            value={mobile} onChange={handleChangeInput}
          />
        </div>
        <div className="form-group">
        <label htmlFor="address">Address</label>
          <input
            className="form-control"
            type="text" id="address" name="address"
            value={address} onChange={handleChangeInput}
          />
        </div>
        <div className="form-group">
        <label htmlFor="website">Website</label>
          <input
            className="form-control"
            type="text" id="website" name="website"
            value={website} onChange={handleChangeInput}
          />
        </div>
        <div className="form-group">
        <label htmlFor="story">Story</label>
          <textarea
            className="form-control"
            id="story" name="story" cols="30" rows="4"
            value={story} onChange={handleChangeInput}
          />
          <span className="text-danger d-block text-right">
            {`${story.length}/200`}
          </span>
        </div>
        <label htmlFor="gender">Gender</label>
        <div className="input-group-append px-0 mb-4">
          <select
            className="custom-select text-capitalize"
            name="gender" id="gender" onChange={handleChangeInput}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button
          className="btn btn-info w-100"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  )
}

export default EditProfile
