import { globalTypes } from "../globalTypes";
import { postDataAPI } from "../../utils/fetchData";
import valid from "../../utils/valid";

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: globalTypes.ALERT, payload: { loading: true } });
    const res = await postDataAPI("login", data);
    dispatch({
      type: globalTypes.AUTH,
      payload: {
        token: res.data.access_token,
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
          token: res.data.access_token,
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

export const register = (data) => async (dispatch) => {
  try {
    const check = valid(data);
    if (check.errorLength > 0) {
      return dispatch({ type: globalTypes.ALERT, payload: check.errorMessage })
    }

    dispatch({ type: globalTypes.ALERT, payload: { loading: true } });
    const res = await postDataAPI('register', data)
    dispatch({
      type: globalTypes.AUTH,
      payload: {
        token: res.data.access_token,
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

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem('firstLogin')
    await postDataAPI('logout')
    window.location.href = "/"
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.message },
    });
  }
}
