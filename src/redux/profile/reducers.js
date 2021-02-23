import { profileTypes } from "./types";
import { initialState } from "../store/initialState";

export const profileReducer = (state = initialState.profile, action) => {
  switch (action.type) {
    case profileTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case profileTypes.GET_USER:
      return {
        ...state,
        users: [...state.users, action.payload.user],
      };
    default:
      return state;
  }
};
