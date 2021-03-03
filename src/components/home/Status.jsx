import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Avatar from '../Avatar';
import { globalTypes } from '../../redux/globalState/types';

const Status = () => {
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)

  return (
    <div className="status my-3 d-flex">
      <Avatar src={auth.user.avatar} size="big-avatar" />
      <button
        className="status_btn flex-fill"
        onClick={() => dispatch({ type: globalTypes.STATUS, payload: true })}
      >
        {`${auth.user.username}, what are you thinking?`}
      </button>
    </div>
  )
}

export default Status
