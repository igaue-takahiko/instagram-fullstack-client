import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart as farHeart,
  faComment as farComment
} from '@fortawesome/free-regular-svg-icons';

const PostsThumb = ({ posts, result }) => {
  const { theme } = useSelector(state => state)

  if (result === 0) {
    return <h2 className="text-center text-danger">No Post</h2>
  }

  return (
    <div className="posts_thumb">
      {posts.map((post) => (
        <Link key={post._id} to={`/post/${post._id}`}>
          <div className="posts_thumb_display">
            <img
              src={post.images[0].url} alt={post.images[0].url}
              style={{ filter: theme ? "invert(1)" : "invert(0)" }}
            />
            <div className="posts_thumb_menu">
              <div style={{ margin: "0 24px", display: "flex" }}>
                <FontAwesomeIcon
                  icon={farHeart} cursor="pointer"
                  size="2x" color="#fff"
                />
                <div style={{ color: "#fff", marginLeft: "4px", fontSize: "1.5rem" }}>
                  {post.likes.length}
                </div>
              </div>
              <div style={{ margin: "0 24px", display: "flex" }}>
                <FontAwesomeIcon
                  icon={farComment} cursor="pointer"
                  size="2x" color="#fff"
                />
                <div style={{ color: "#fff", marginLeft: "4px", fontSize: "1.5rem" }}>
                  {post.comments.length}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default PostsThumb
