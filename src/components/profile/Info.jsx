import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Avatar from '../Avatar';
import EditProfile from './EditProfile';
import { FollowBtn } from '../../components';
import { getProfileUsers } from '../../redux/profile/actions';

const Info = () => {
  const dispatch = useDispatch()
  const { auth, profile } = useSelector(state => state)
  const { id } = useParams()

  const [ userData, setUserData ] = useState([])
  const [ onEdit, setOnEdit ] = useState(false)

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user])
    } else {
      dispatch(getProfileUsers({ users: profile.users, id, auth }))
      const newData = profile.users.filter(user => user._id === id)
      setUserData(newData)
    }
  },[auth, dispatch, id, profile.users])

  return (
    <div className="info">
      {userData.map((user, index) => (
        <div className="info_container" key={index}>
          <Avatar src={user.avatar} size="super-avatar" />
          <div className="info_content">
            <div className="info_content_title">
              <h2>{user.username}</h2>
              {
                user._id === auth.user._id
                ? <button
                    className="btn btn-outline-info"
                    onClick={() => setOnEdit(true)}
                  >
                    Edit Profile
                  </button>
                : <FollowBtn />
              }
            </div>
            <div className="follow_btn">
              <span className="mr-4">
                {user.followers.length}
                {" Followers"}
              </span>
              <span className="ml-4">
                {user.following.length}
                {" Following"}
              </span>
            </div>
            <h6>{user.fullName} {user.mobile}</h6>
            <p className="m-0">{user.address}</p>
            <h6>{user.email}</h6>
            <a href={user.website} target="_blank" rel="noreferrer">
              {user.website}
            </a>
            <p>{user.story}</p>
          </div>
          {onEdit && <EditProfile setOnEdit={setOnEdit} />}
        </div>
      ))}
    </div>
  )
}

export default Info
