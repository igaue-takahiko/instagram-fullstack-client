import { notifyTypes } from './types';
import { initialState } from '../store/initialState';

export const notifyReducer = (state = initialState.notify, action) => {
  switch (action.type) {
    case notifyTypes.NOTIFY:
      return action.payload
    default:
      return state
  }
}