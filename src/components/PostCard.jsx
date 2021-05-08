import React from 'react'

import { CardBody, CardHeader, CardFooter } from './home/post_card';
import { Comments, InputComment } from './home';

const PostCard = ({ post, theme }) => {
  return (
    <div className="card my-3">
      <CardHeader post={post} />
      <CardBody post={post} theme={theme} />
      <CardFooter post={post} />
      <Comments post={post} />
      <InputComment post={post} />
    </div>
  )
}

export default PostCard
