import { globalTypes } from "../globalState/types";
import { suggestionsType } from "./types";
import { getDataAPI } from "../../utils/fetchData";

export const getSuggestions = (token) => async (dispatch) => {
  try {
    dispatch({ type: suggestionsType.LOADING, payload: true });

    const res = await getDataAPI("suggestionsUser", token);
    dispatch({ type: suggestionsType.GET_USERS_SUGGESTIONS, payload: res.data })

    dispatch({ type: suggestionsType.LOADING, payload: false });
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};
