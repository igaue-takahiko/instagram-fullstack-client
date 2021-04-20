import { messageTypes } from './types';

export const addUser = ({ user, message }) => async (dispatch) => {
  if (message.users.every(item => item._id !== user._id)) {
    dispatch({ type: messageTypes.ADD_USER, payload: user })
  }
}
