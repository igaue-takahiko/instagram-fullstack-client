import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import LoadIcon from '../../images/load-icon.gif';
import { Info, Posts } from '../../components';

import { getProfileUsers } from '../../redux/profile/actions';

const Profile = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { profile, auth } = useSelector(state => state)

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
      {
        profile.loading
        ? <img className="d-block mx-auto my-4" src={LoadIcon} alt="loading"/>
        : <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
      }
    </div>
  )
}

export default Profile
