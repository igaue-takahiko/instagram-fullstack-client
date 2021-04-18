import { globalTypes } from "../globalState/types";
import { postDataAPI, deleteDataAPI, getDataAPI, patchDataAPI } from "../../utils/fetchData";
import { notifyTypes } from "./types";

export const createNotify = ({ msg, auth, socket }) => async (dispatch) => {
  try {
    const res = await postDataAPI("notify", msg, auth.token);
    socket.emit("createNotify", {
      ...res.data.notify,
      user: {
        username: auth.user.username,
        avatar: auth.user.avatar,
      },
    });
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const removeNotify = ({ msg, auth, socket }) => async (dispatch) => {
  try {
    await deleteDataAPI(`notify/${msg.id}?url=${msg.url}`, auth.token);

    socket.emit("removeNotify", msg);
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const getNotifies = (token) => async (dispatch) => {
  try {
    const res = await getDataAPI("notifies", token);
    dispatch({ type: notifyTypes.GET_NOTIFIES, payload: res.data.notifies });
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const isReadNotify = ({ msg, auth }) => async (dispatch) => {
  dispatch({
    type: notifyTypes.UPDATE_NOTIFY,
    payload: { ...msg, isRead: true },
  });

  try {
    await patchDataAPI(`isReadNotify/${msg._id}`, null, auth.token);
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const deleteAllNotifies = (token) => async (dispatch) => {
  dispatch({ type: notifyTypes.DELETE_ALL_NOTIFIES, payload: [] });

  try {
    await deleteDataAPI("deleteAllNotify", token);
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};
