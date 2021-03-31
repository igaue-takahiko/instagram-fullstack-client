import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPost } from '../../redux/detailPost/actions';

import LoadIcon from '../../images/load-icon.gif';
import { PostCard } from '../../components';

const Post = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { auth, detailPost } = useSelector(state => state)

  const [ post, setPost ] = useState([])

  useEffect(() => {
    dispatch(getPost({ detailPost, id, auth }))
    if (detailPost.length > 0) {
      const newArr = detailPost.filter(post => post._id === id)
      setPost(newArr)
    }
  },[auth, detailPost, dispatch, id])

  return (
    <div className="posts">
      {
        post.length === 0 && (
          <img
            className="d-block mx-auto my-4"
            src={LoadIcon} alt="loading"
          />
        )
      }
      {post.map((item) => (
        <PostCard key={item._id} post={item} />
      ))}
    </div>
  )
}

export default Post
