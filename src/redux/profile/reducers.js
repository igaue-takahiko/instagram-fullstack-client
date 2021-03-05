import { profileTypes } from "./types";
import { initialState } from "../store/initialState";
import { EditData } from "./helpers";

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
    case profileTypes.FOLLOW:
      return {
        ...state,
        users: EditData(state.users, action.payload._id, action.payload),
      };
    case profileTypes.UN_FOLLOW:
      return {
        ...state,
        users: EditData(state.users, action.payload._id, action.payload),
      };
    default:
      return state;
  }
};
