import { authTypes } from './types';
import { initialState } from '../store/initialState';

export const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case authTypes.AUTH:
      return action.payload
    default:
      return state
  }
}