import { globalTypes } from "../types";
import { initialState } from "../../store/initialState";

export const onlineReducer = (state = initialState.online, action) => {
  switch (action.type) {
    case globalTypes.ONLINE:
      return [...state, action.payload];
    case globalTypes.OFFLINE:
      return state.filter((item) => item !== action.payload);
    default:
      return state;
  }
};
