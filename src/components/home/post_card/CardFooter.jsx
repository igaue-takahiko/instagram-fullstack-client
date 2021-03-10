import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faBookmark,  } from '@fortawesome/free-solid-svg-icons';

import Send from '../../../images/send.svg';

const CardFooter = ({ post }) => {
  return (
    <div className="card_footer">
      <div className="card_icon_menu">
        <div>
          <FontAwesomeIcon icon={faHeart} cursor="pointer" size="lg" style={{ margin: 12 }} />
          <Link className="text-dark" to={`/post/${post._id}`}>
            <FontAwesomeIcon icon={faComment} cursor="pointer" size="lg" style={{ margin: 12 }} />
          </Link>
          <img src={Send} alt="send"/>
        </div>
        <FontAwesomeIcon icon={faBookmark} cursor="pointer" size="lg" style={{ margin: 12 }} />
      </div>
      <div className="justify-content-between d-flex">
        <h6 style={{ padding: "0 32px", cursor: "pointer" }}>
            {post.likes.length}
        </h6>
        <h6 style={{ padding: "0 24px", cursor: "pointer" }}>
          {`${post.comments.length} comments`}
        </h6>
      </div>
    </div>
  )
}

export default CardFooter
