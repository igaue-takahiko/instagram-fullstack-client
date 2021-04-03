import { homePostTypes } from "./types";
import { initialState } from "../store/initialState";
import { EditData, DeleteData } from "../globalState/helpers";

export const homePostReducer = (state = initialState.homePost, action) => {
  switch (action.type) {
    case homePostTypes.CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case homePostTypes.LOADING_POST:
      return {
        ...state,
        loading: action.payload,
      };
    case homePostTypes.GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        result: action.payload.result,
        page: action.payload.page,
      };
    case homePostTypes.UPDATE_POST:
      return {
        ...state,
        posts: EditData(state.posts, action.payload._id, action.payload),
      };
    case homePostTypes.DELETE_POST:
      return {
        ...state,
        posts: DeleteData(state.posts, action.payload._id),
      };
    default:
      return state;
  }
};
