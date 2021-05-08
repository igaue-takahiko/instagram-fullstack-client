import { messageTypes } from "./types";
import { globalTypes } from "../globalState/types";
import { postDataAPI, getDataAPI, deleteDataAPI } from "../../utils/fetchData";
import { DeleteData } from '../globalState/helpers';

export const addMessage = ({ msg, auth, socket }) => async (dispatch) => {
  dispatch({ type: messageTypes.ADD_MESSAGE, payload: msg });

  const { _id, avatar, fullName, username } = auth.user
  socket.emit("addMessage", { ...msg, user: { _id, avatar, fullName, username } });

  try {
    await postDataAPI("message", msg, auth.token);
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const getConversations = ({ auth, page = 1 }) => async (dispatch) => {
  try {
    const res = await getDataAPI(`conversations?limit=${page}`, auth.token);

    let newArr = [];
    res.data.conversations.forEach((item) => {
      item.recipients.forEach((cv) => {
        if (cv._id !== auth.user._id) {
          newArr.push({ ...cv, text: item.text, media: item.media });
        }
      });
    });

    dispatch({
      type: messageTypes.GET_CONVERSATIONS,
      payload: { newArr, result: res.data.result },
    });
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const getMessages = ({ auth, id, page = 1 }) => async (dispatch) => {
  try {
    const res = await getDataAPI(`message/${id}?limit=${page * 9}`, auth.token);
    const newData = { ...res.data, messages: res.data.messages.reverse() }
    dispatch({ type: messageTypes.GET_MESSAGES, payload: { ...newData, _id: id, page } });
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const loadMoreMessages = ({ auth, id, page = 1 }) => async (dispatch) => {
  try {
    const res = await getDataAPI(`message/${id}?limit=${page * 9}`, auth.token);
    const newData = { ...res.data, messages: res.data.messages.reverse() }
    dispatch({ type: messageTypes.UPDATE_MESSAGES, payload: { ...newData, _id: id, page } });
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
}

export const deleteMessages = ({ msg, data, auth }) => async (dispatch) => {
  const newData = DeleteData(data, msg._id)
  dispatch({ type: messageTypes.DELETE_MESSAGES, payload: { newData, _id: msg.recipient } })
  try {
    await deleteDataAPI(`message/${msg._id}`, auth.token)
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
}

export const deleteConversation = ({ auth, id }) => async (dispatch) => {
  dispatch({ type: messageTypes.DELETE_CONVERSATION, payload: id })
  try {
    await deleteDataAPI(`conversation/${id}`, auth.token)
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
}
