import { suggestionsType } from './types';
import { initialState } from '../store/initialState';

export const suggestionsReducers = (state = initialState.suggestions, action) => {
  switch (action.type) {
    case suggestionsType.LOADING:
    return {
      ...state,
      loading: action.payload
    }
  case suggestionsType.GET_USERS_SUGGESTIONS:
    return {
      ...state,
      users: action.payload.users
    }
    default:
      return state
  }
}
