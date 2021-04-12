import React, {  } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretSquareUp } from '@fortawesome/free-regular-svg-icons';

import { getSuggestions } from '../../redux/suggestions/actions';

import { UserCard, FollowBtn } from '../../components';
import LoadIcon from '../../images/load-icon.gif';

const RightSideBar = () => {
  const dispatch = useDispatch()
  const { auth, suggestions } = useSelector(state => state)

  return (
    <div className="mt-3">
      <UserCard user={auth.user} />
      <div className="d-flex justify-content-between align-items-center my-2">
        <h5 className="text-danger">Suggestions for you</h5>
        {
          !suggestions.loading && (
            <FontAwesomeIcon
              icon={faCaretSquareUp} cursor="pointer"
              onClick={() => dispatch(getSuggestions(auth.token))}
            />
          )
        }
      </div>
      {
        suggestions.loading
        ? <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4"/>
        : <div className="suggestions">
          {
            suggestions.users.map(user => (
              <UserCard key={user._id} user={user}>
                <FollowBtn user={user} />
              </UserCard>
            ))
          }
        </div>
      }
      <div className="my-2" style={{ opacity: 0.5 }}>
        <a href="https://www.youtube.com" target="_blank" rel="noreferrer">youtube</a>
        <small className="d-block">
          Welcome to our channel Instagram
        </small>
        <small>
          &copy; 2021 I-NETWORK FROM TAKAHIKO IGAUE
        </small>
      </div>
    </div>
  )
}

export default RightSideBar
