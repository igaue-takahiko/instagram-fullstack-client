import React, { useEffect, useState } from 'react'

import { getDataAPI } from '../../utils/fetchData';
import { profileTypes } from '../../redux/profile/types';

import PostsThumb from '../PostsThumb';
import LoadMoreBtn from '../LoadMoreBtn';
import LoadIcon from '../../images/load-icon.gif';

const Posts = ({ auth, dispatch, id, profile }) => {
  const [ posts, setPosts ] = useState([])
  const [ result, setResult ] = useState(9)
  const [ page, setPage ] = useState(0)
  const [ load, setLoad ] = useState(false)

  useEffect(() => {
    profile.posts.forEach((data) => {
      if (data._id === id) {
        setPosts(data.posts)
        setResult(data.result)
        setPage(data.page)
      }
    })
  },[id, profile.posts])

  const handleLoadMore = async () => {
    setLoad(true)
    const res = await getDataAPI(`user_posts/${id}?limit=${page * 9}`, auth.token)
    const newData = {...res.data, page: page + 1, _id: id}
    dispatch({ type: profileTypes.UPDATE_PROFILE_POST, payload: newData })
    setLoad(false)
  }

  return (
    <div>
      <PostsThumb posts={posts} result={result} />
      {load && <img className="d-block mx-auto" src={LoadIcon} alt="loading"/>}
        <LoadMoreBtn
          result={result} page={page}
          load={load} handleLoadMore={handleLoadMore}
        />
    </div>
  )
}

export default Posts
