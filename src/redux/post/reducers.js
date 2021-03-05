import { postTypes } from "./types";
import { initialState } from "../store/initialState";

export const postReducer = (state = initialState.homePost, action) => {
  switch (action.type) {
    case postTypes.CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    default:
      return state;
  }
};
