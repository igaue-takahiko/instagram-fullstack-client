import { globalTypes } from '../types';
import { initialState } from '../../store/initialState';

export const callReducer = (state = initialState.call, action) => {
  switch (action.type) {
    case globalTypes.CALL:
      return action.payload
    default:
      return state
  }
}