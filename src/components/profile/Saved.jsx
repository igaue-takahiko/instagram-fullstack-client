import React, { useEffect, useState } from 'react'

import { getDataAPI } from '../../utils/fetchData';
import { globalTypes } from '../../redux/globalState/types';

import PostsThumb from '../PostsThumb';
import LoadMoreBtn from '../LoadMoreBtn';
import LoadIcon from '../../images/load-icon.gif';

const Saved = ({ auth, dispatch }) => {
  const [ savePosts, setSavePosts ] = useState([])
  const [ result, setResult ] = useState(9)
  const [ page, setPage ] = useState(2)
  const [ load, setLoad ] = useState(false)

  useEffect(() => {
    setLoad(true)
    getDataAPI('getSavePosts', auth.token).then((res) => {
      setSavePosts(res.data.savePosts)
      setResult(res.data.result)
      setLoad(false)
    }).catch((error) => {
      dispatch({ type: globalTypes.ALERT, payload: { error: error.response.data.msg } })
    })

    return () => setSavePosts([])
  },[auth.token, dispatch])

  const handleLoadMore = async () => {
    setLoad(true)
    const res = await getDataAPI(`getSavePosts?limit=${page * 9}`, auth.token)
    setSavePosts(res.data.result)
    setPage(page + 1)
    setLoad(false)
  }

  return (
    <div>
      <PostsThumb posts={savePosts} result={result} />
      {load && <img className="d-block mx-auto" src={LoadIcon} alt="loading"/>}
      <LoadMoreBtn
        result={result} page={page}
        load={load} handleLoadMore={handleLoadMore}
      />
    </div>
  )
}

export default Saved
