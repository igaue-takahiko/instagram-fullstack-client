import React, { useEffect, useState } from 'react'

import PostsThumb from '../PostsThumb';

const Posts = ({ auth, dispatch, id, profile }) => {
  const [ posts, setPosts ] = useState([])
  const [ result, setResult ] = useState(9)

  useEffect(() => {
    profile.posts.forEach((data) => {
      if (data._id === id) {
        setPosts(data.posts)
        setResult(data.result)
      }
    })
  },[id, profile.posts])

  return (
    <div>
      <PostsThumb posts={posts} result={result} />
    </div>
  )
}

export default Posts
