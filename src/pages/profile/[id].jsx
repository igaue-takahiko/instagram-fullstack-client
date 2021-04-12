import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import LoadIcon from '../../images/load-icon.gif';
import { Info, Posts, Saved } from '../../components';

import { getProfileUsers } from '../../redux/profile/actions';

const Profile = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { profile, auth } = useSelector(state => state)

  const [ saveTab, setSaveTab ] = useState()

  useEffect(() => {
    if (profile.ids.every(item => item !== id)) {
      dispatch(getProfileUsers({ id, auth }))
    }
  },[auth, dispatch, id, profile.ids])

  return (
    <div className="profile">
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="profile page"/>
      </Helmet>
      <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />
      {auth.user._id === id && (
        <div className="profile_tab">
          <button
            className={saveTab ? "" : "active"}
            onClick={() => setSaveTab(false)}
          >
            Posts
          </button>
          <button
            className={saveTab ? "active" : ""}
            onClick={() => setSaveTab(true)}
          >
            Saved
          </button>
        </div>
      )}
      {
        profile.loading
        ? <img className="d-block mx-auto my-4" src={LoadIcon} alt="loading"/>
        : <div>
          {
            saveTab
            ? <Saved auth={auth} dispatch={dispatch} />
            : <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
          }
          </div>
      }
    </div>
  )
}

export default Profile
