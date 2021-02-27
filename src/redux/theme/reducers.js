import { globalTypes } from '../globalState/types';
import { initialState } from '../store/initialState';

export const themeReducer = (state = initialState.theme, action) => {
  switch (action.type) {
    case globalTypes.THEME:
      return action.payload
    default:
      return state
  }
}
