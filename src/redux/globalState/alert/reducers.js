import { globalTypes } from '../types';
import { initialState } from '../../store/initialState';

export const alertReducer = (state = initialState.alert, action) => {
  switch (action.type) {
    case globalTypes.ALERT:
      return action.payload
    default:
      return state
  }
}