import React from 'react'
import { Helmet } from 'react-helmet-async';

import { Info, Posts } from '../../components';

const Profile = () => {
  return (
    <div className="profile">
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="profile page"/>
      </Helmet>
      <Info />
      <Posts />
    </div>
  )
}

export default Profile
