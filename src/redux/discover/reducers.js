import { discoverTypes } from "./types";
import { initialState } from "../store/initialState";

export const discoverReducer = (state = initialState.discover, action) => {
  switch (action.type) {
    case discoverTypes.LOADING_DISCOVER:
      return {
        ...state,
        loading: action.payload,
      };
    case discoverTypes.GET_DISCOVER_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        result: action.payload.result,
        firstLoad: true,
      };
    case discoverTypes.UPDATE_DISCOVER_POST:
      return {
        ...state,
        posts: action.payload.posts,
        result: action.payload.result,
        page: state.page + 1,
      };
    default:
      return state;
  }
};
