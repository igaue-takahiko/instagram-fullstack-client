import { globalTypes } from "../globalState/types";
import { postTypes } from "../post/types";
import { postDataAPI } from "../../utils/fetchData";

export const createComment = (post, newComment, auth) => async (dispatch) => {
  const newPost = { ...post, comments: [...post.comments, newComment] };
  dispatch({ type: postTypes.UPDATE_POST, payload: newPost });

  try {
    const data = { ...newComment, postId: post._id };
    const res = await postDataAPI("comment", data, auth.token);

    const newData = { ...res.data.newComment, user: auth.user };
    const newPost = { ...post, comments: [...post.comments, newData] };
    dispatch({ type: postTypes.UPDATE_POST, payload: newPost });
  } catch (error) {
    dispatch({ type: globalTypes.ALERT, error: error.response.data.msg });
  }
};
