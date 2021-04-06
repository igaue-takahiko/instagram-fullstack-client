import React from 'react'
import { useSelector } from 'react-redux';

import { Status, Posts } from '../components/home';
import LoadingIcon from '../images/load-icon.gif';

const Home = () => {
  const { homePosts } = useSelector(state => state)

  return (
    <div className="home row mx-0">
      <div className="col-md-8">
        <Status />
        {
          homePosts.loading
          ? <img src={LoadingIcon} alt="loading" className="d-block mx-auto" />
          : homePosts.result === 0
            ? <h2 className="text-center">No Post</h2>
            : <Posts />
        }
      </div>
      <div className="col-md-4">
        sideBar
      </div>
    </div>
  )
}

export default Home
