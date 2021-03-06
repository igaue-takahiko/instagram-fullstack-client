import { globalTypes } from '../globalState/types';
import { initialState } from '../store/initialState';

export const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case globalTypes.AUTH:
      return action.payload
    default:
      return state
  }
}