import { globalTypes } from '../types';
import { initialState } from '../../store/initialState';

export const socketReducer = (state = initialState.socket, action) => {
  switch (action.type) {
    case globalTypes.SOCKET:
      return action.payload
    default:
      return state
  }
}
