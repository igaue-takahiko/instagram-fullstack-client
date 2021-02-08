import { globalTypes } from '../globalTypes';
import { postDataAPI } from "../../utils/fetchData";

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: globalTypes.ALERT, payload: { loading: true } });
    const res = await postDataAPI("login", data);
    dispatch({
      type: globalTypes.AUTH,
      payload: {
        token: res.data.success_token,
        user: res.data.user,
      },
    });
    localStorage.setItem("firstLogin", true);
    dispatch({
      type: globalTypes.ALERT,
      payload: { success: res.data.message },
    });
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.message },
    });
  }
};

export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");
  if (firstLogin) {
    dispatch({ type: globalTypes.ALERT, payload: { loading: true } });
    try {
      const res = await postDataAPI("refresh_token");
      dispatch({
        type: globalTypes.AUTH,
        payload: {
          token: res.data.success_token,
          user: res.data.user,
        },
      });
      dispatch({ type: globalTypes.ALERT, payload: {} });
    } catch (error) {
      dispatch({
        type: globalTypes.ALERT,
        payload: { error: error.response.data.message },
      });
    }
  }
};
