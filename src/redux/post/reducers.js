import { postTypes } from "./types";
import { initialState } from "../store/initialState";

export const postReducer = (state = initialState.homePost, action) => {
  switch (action.type) {
    case postTypes.CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
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
        result: action.payload.result
      };
    default:
      return state;
  }
};
