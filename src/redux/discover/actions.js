import { discoverTypes } from "./types";
import { globalTypes } from "../globalState/types";
import { getDataAPI } from "../../utils/fetchData";

export const getDiscoverPosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: discoverTypes.LOADING_DISCOVER, payload: true });

    const res = await getDataAPI("post_discover", token);
    dispatch({ type: discoverTypes.GET_DISCOVER_POSTS, payload: res.data })

    dispatch({ type: discoverTypes.LOADING_DISCOVER, payload: false });
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};
