import { globalTypes } from '../types';
import { initialState } from '../../store/initialState';

export const modalReducer = (state = initialState.modal, action) => {
  switch (action.type) {
    case globalTypes.MODAL:
      return action.payload
    default:
      return state
  }
}