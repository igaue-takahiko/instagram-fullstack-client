import React from 'react'
import { Status, Posts } from '../components/home';

const Home = () => {
  return (
    <div className="home row mx-0">
      <div className="col-md-8">
        <Status />
        <Posts />
      </div>
      <div className="col-md-4"></div>
    </div>
  )
}

export default Home
