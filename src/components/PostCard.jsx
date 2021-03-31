import React from 'react'

import { CardBody, CardHeader, CardFooter } from './home/post_card';
import { Comments, InputComment } from './home';

const PostCard = ({ post }) => {
  return (
    <div className="card my-3">
      <CardHeader post={post} />
      <CardBody post={post} />
      <CardFooter post={post} />
      <Comments post={post} />
      <InputComment post={post} />
    </div>
  )
}

export default PostCard
