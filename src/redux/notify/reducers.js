import { notifyTypes } from "./types";
import { initialState } from "../store/initialState";
import { EditData } from "../globalState/helpers";

export const notifyReducer = (state = initialState.notify, action) => {
  switch (action.type) {
    case notifyTypes.GET_NOTIFIES:
      return {
        ...state,
        data: action.payload,
      };
    case notifyTypes.CREATE_NOTIFY:
      return {
        ...state,
        data: [action.payload, ...state.data],
      };
    case notifyTypes.REMOVE_NOTIFY:
      return {
        ...state,
        data: state.data.filter(
          (item) =>
            item.id !== action.payload.id || item.url !== action.payload.url
        ),
      };
    case notifyTypes.UPDATE_NOTIFY:
      return {
        ...state,
        data: EditData(state.data, action.payload._id, action.payload),
      };
    case notifyTypes.UPDATE_SOUND:
      return {
        ...state,
        sound: action.payload,
      };
    case notifyTypes.DELETE_ALL_NOTIFIES:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
