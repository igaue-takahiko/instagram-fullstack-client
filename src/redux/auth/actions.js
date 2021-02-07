import { notifyTypes } from "../notify/types";
import { postDataAPI } from "../../utils/fetchData";

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: notifyTypes.NOTIFY, payload: { loading: true } });
    const res = await postDataAPI("login", data);
    dispatch({
      type: notifyTypes.NOTIFY,
      payload: {
        token: res.data.success_token,
        user: res.data.user
      }
    })
    localStorage.setItem("firstLogin", true)
    dispatch({
      type: notifyTypes.NOTIFY,
      payload: { success: res.data.message }
    })
  } catch (error) {
    dispatch({
      type: notifyTypes.NOTIFY,
      payload: { error: error.response.data.message },
    });
  }
};
