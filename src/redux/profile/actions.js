import { globalTypes } from "../globalTypes";
import { profileTypes } from "./types";
import { getDataAPI } from "../../utils/fetchData";

export const getProfileUsers = ({ users, id, auth }) => async (dispatch) => {
  if (users.every((user) => user._id !== id)) {
    try {
      dispatch({ type: profileTypes.LOADING, payload: true });

      const res = await getDataAPI(`user/${id}`, auth.token);
      dispatch({
        type: profileTypes.GET_USER,
        payload: res.data,
      });

      dispatch({ type: profileTypes.LOADING, payload: false });
    } catch (error) {
      dispatch({
        type: globalTypes.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  }
};
