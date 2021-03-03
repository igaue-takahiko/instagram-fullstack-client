import { globalTypes } from '../globalState/types';
import { initialState } from '../store/initialState';

export const statusReducer = (state = initialState.status, action) => {
  switch (action.type) {
    case globalTypes.STATUS:
      return action.payload
    default:
      return state
  }
}