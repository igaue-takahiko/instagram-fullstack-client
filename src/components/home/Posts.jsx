import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { getDataAPI } from '../../utils/fetchData';
import { homePostTypes } from '../../redux/homePost/types';

import PostCard from '../PostCard';
import LoadMoreBtn from '../LoadMoreBtn';
import LoadIcon from '../../images/load-icon.gif';

const Posts = () => {
  const dispatch = useDispatch()
  const { homePosts, auth } = useSelector(state => state)

  const [ load, setLoad ] = useState(false)

  const handleLoadMore = async () => {
    setLoad(true)
    const res = await getDataAPI(`posts?limit=${homePosts.page * 9}`, auth.token)
    dispatch({ type: homePostTypes.GET_POSTS, payload: { ...res.data, page: homePosts.page + 1 } })
    setLoad(false)
  }

  return (
    <div className="posts">
      {homePosts.posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
      {load && <img className="d-block mx-auto" src={LoadIcon} alt="loading"/>}
        <LoadMoreBtn
          result={homePosts.result} page={homePosts.page}
          load={load} handleLoadMore={handleLoadMore}
        />
    </div>
  )
}

export default Posts
