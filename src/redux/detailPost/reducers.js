import { detailPostTypes } from "./types";
import { initialState } from "../store/initialState";
import { EditData } from "../globalState/helpers";

export const detailPostReducer = (state = initialState.detailPost, action) => {
  switch (action.type) {
    case detailPostTypes.GET_POST:
      return [...state, action.payload];
    case detailPostTypes.UPDATE_POST:
      return EditData(state, action.payload._id, action.payload);
    default:
      return state;
  }
};
