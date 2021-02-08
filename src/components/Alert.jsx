import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Loading from './Loading';
import Toast from './Toast';
import { globalTypes } from '../redux/globalTypes';

const Alert = () => {
  const dispatch = useDispatch()
  const { alert } = useSelector(state => state)

  return (
    <div>
      {alert.loading && <Loading />}
      {
        alert.error &&
        <Toast
          message={{ title: "Error !", body: alert.error }}
          handleShow={() => dispatch({ type: globalTypes.ALERT, payload: {} })}
          bgColor="bg-danger"
        />
      }
      {
        alert.success &&
        <Toast
        message={{ title: "Success !", body: alert.success }}
        handleShow={() => dispatch({ type: globalTypes.ALERT, payload: {} })}
        bgColor="bg-success"
        />
      }
    </div>
  )
}

export default Alert
