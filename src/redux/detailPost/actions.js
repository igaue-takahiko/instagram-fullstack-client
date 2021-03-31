import { detailPostTypes } from "./types";
import { globalTypes } from "../globalState/types";
import { getDataAPI } from "../../utils/fetchData";

export const getPost = ({ detailPost, id, auth }) => async (dispatch) => {
  if (detailPost.every((post) => post._id !== id)) {
    try {
      const res = await getDataAPI(`post/${id}`, auth.token);
      dispatch({ type: detailPostTypes.GET_POST, payload: res.data.post });
    } catch (error) {
      dispatch({
        type: globalTypes.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  }
};
