import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Avatar from '../Avatar';
import EditProfile from './EditProfile';
import Followers from './Followers';
import Following from './Following';
import { FollowBtn } from '../../components';
import { getProfileUsers } from '../../redux/profile/actions';
import { globalTypes } from '../../redux/globalState/types';

const Info = () => {
  const dispatch = useDispatch()
  const { auth, profile } = useSelector(state => state)
  const { id } = useParams()

  const [ userData, setUserData ] = useState([])
  const [ onEdit, setOnEdit ] = useState(false)
  const [ showFollowers, setShowFollowers ] = useState(false)
  const [ showFollowing, setShowFollowing ] = useState(false)

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user])
    } else {
      dispatch(getProfileUsers({ users: profile.users, id, auth }))
      const newData = profile.users.filter(user => user._id === id)
      setUserData(newData)
    }
  },[auth, dispatch, id, profile.users])

  useEffect(() => {
    if (showFollowers || setShowFollowing || onEdit) {
      dispatch({ type: globalTypes.MODAL, payload: true })
    } else {
      dispatch({ type: globalTypes.MODAL, payload: false })
    }
  },[dispatch, onEdit, showFollowers])

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
                : <FollowBtn user={user} />
              }
            </div>
            <div className="follow_btn">
              <span className="mr-4" onClick={() => setShowFollowers(true)}>
                {`${user.followers.length} Followers`}
              </span>
              <span className="ml-4" onClick={() => setShowFollowing(true)}>
                {`${user.following.length} Following`}
              </span>
            </div>
            <h6>
              {user.fullName}
              <span className="text-danger ml-1">
                {user.mobile}
              </span>
            </h6>
            <p className="m-0">{user.address}</p>
            <h6 className="m-0">{user.email}</h6>
            <a href={user.website} target="_blank" rel="noreferrer">
              {user.website}
            </a>
            <p>{user.story}</p>
          </div>
          {onEdit && <EditProfile setOnEdit={setOnEdit} />}
          {showFollowers && <Followers users={user.followers} setShowFollowers={setShowFollowers} />}
          {showFollowing && <Following users={user.following} setShowFollowing={setShowFollowing} />}
        </div>
      ))}
    </div>
  )
}

export default Info
