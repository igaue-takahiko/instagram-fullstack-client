import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { getDiscoverPosts } from '../redux/discover/actions';
import { discoverTypes } from '../redux/discover/types';
import { getDataAPI } from '../utils/fetchData';

import LoadIcon from '../images/load-icon.gif';
import { PostsThumb, LoadMoreBtn } from '../components';

const Discover = () => {
  const dispatch = useDispatch()
  const { auth, discover } = useSelector(state => state)

  const [ load, setLoad ] = useState(false)

  useEffect(() => {
    if (!discover.firstLoad) {
      dispatch(getDiscoverPosts(auth.token))
    }
  },[auth.token, discover.firstLoad, dispatch])

  const handleLoadMore = async () => {
    setLoad(true)
    const res = await getDataAPI(`post_discover?limit=${discover.page * 3}`, auth.token)
    dispatch({ type: discoverTypes.UPDATE_DISCOVER_POST, payload: res.data })
    setLoad(false)
  }

  return (
    <div>
      {
        discover.loading
        ? <img className="d-block mx-auto my-4" src={LoadIcon} alt="loading"/>
        : <PostsThumb posts={discover.posts} result={discover.result} />
      }
      {load && <img className="d-block mx-auto" src={LoadIcon} alt="loading"/>}
      {!discover.loading && (
        <LoadMoreBtn
          result={discover.result} page={discover.page}
          load={load} handleLoadMore={handleLoadMore}
        />
      )}
    </div>
  )
}

export default Discover
