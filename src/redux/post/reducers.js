import { postTypes } from "./types";
import { initialState } from "../store/initialState";
import { EditData } from "../profile/helpers";

export const postReducer = (state = initialState.homePost, action) => {
  switch (action.type) {
    case postTypes.CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case postTypes.LOADING_POST:
      return {
        ...state,
        loading: action.payload,
      };
    case postTypes.GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        result: action.payload.result,
      };
    case postTypes.UPDATE_POST:
      return {
        ...state,
        posts: EditData(state.posts, action.payload._id, action.payload),
      };
    default:
      return state;
  }
};
