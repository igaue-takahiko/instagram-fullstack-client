import { messageTypes } from "./types";
import { initialState } from "../store/initialState";

export const messageReducer = (state = initialState.message, action) => {
  switch (action.type) {
    case messageTypes.ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
      };
    default:
      return state;
  }
};
