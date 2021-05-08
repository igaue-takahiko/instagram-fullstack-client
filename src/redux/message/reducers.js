import { messageTypes } from "./types";
import { initialState } from "../store/initialState";
import { EditData, DeleteData } from "../globalState/helpers";

export const messageReducer = (state = initialState.message, action) => {
  switch (action.type) {
    case messageTypes.ADD_USER:
      if (state.users.every((item) => item._id !== action.payload._id)) {
        return {
          ...state,
          users: [action.payload, ...state.users],
        };
      }
      return state;
    case messageTypes.ADD_MESSAGE:
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload.recipient ||
          item._id === action.payload.sender
            ? {
                ...item,
                messages: [...item.messages, action.payload],
                result: item.result + 1,
              }
            : item
        ),
        users: state.users.map((user) =>
          user._id === action.payload.recipient ||
          user._id === action.payload.sender
            ? {
                ...user,
                text: action.payload.text,
                media: action.payload.media,
              }
            : user
        ),
      };
    case messageTypes.GET_CONVERSATIONS:
      return {
        ...state,
        users: action.payload.newArr,
        resultUser: action.payload.result,
        firstLoad: true,
      };
    case messageTypes.GET_MESSAGES:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case messageTypes.UPDATE_MESSAGES:
      return {
        ...state,
        data: EditData(state.data, action.payload._id, action.payload),
      };
    case messageTypes.DELETE_MESSAGES:
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload._id
            ? { ...item, messages: action.payload.newData }
            : item
        ),
      };
    case messageTypes.DELETE_CONVERSATION:
      return {
        ...state,
        users: DeleteData(state.users, action.payload),
        data: DeleteData(state.data, action.payload),
      };
    case messageTypes.CHECK_ONLINE_OFFLINE:
      return {
        ...state,
        users: state.users.map((user) =>
          action.payload.includes(user._id)
            ? { ...user, online: true }
            : { ...user, online: false }
        ),
      };
    default:
      return state;
  }
};
