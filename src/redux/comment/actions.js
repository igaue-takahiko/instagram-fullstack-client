import { globalTypes } from "../globalState/types";
import { postTypes } from "../post/types";
import { postDataAPI, patchDataAPI } from "../../utils/fetchData";
import { EditData, DeleteData } from "../globalState/helpers";

export const createComment = ({ post, newComment, auth }) => async (dispatch) => {
  const newPost = { ...post, comments: [...post.comments, newComment] };
  dispatch({ type: postTypes.UPDATE_POST, payload: newPost });

  try {
    const data = { ...newComment, postId: post._id };
    const res = await postDataAPI("comment", data, auth.token);

    const newData = { ...res.data.newComment, user: auth.user };
    const newPost = { ...post, comments: [...post.comments, newData] };
    dispatch({ type: postTypes.UPDATE_POST, payload: newPost });
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const updateComment = ({ comment, post, content, auth }) => async (
  dispatch
) => {
  const newComments = EditData(post.comments, comment._id, {
    ...comment,
    content,
  });
  const newPost = { ...post, comments: newComments };

  dispatch({ type: postTypes.UPDATE_POST, payload: newPost });

  try {
    await patchDataAPI(`comment/${comment._id}`, { content }, auth.token);
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const likeComment = ({ comment, post, auth }) => async (dispatch) => {
  const newComment = { ...comment, likes: [ ...comment.likes, auth.user ] }

  const newComments = EditData(post.comments, comment._id, newComment)

  const newPost = { ...post, comments: newComments }

  dispatch({ type: postTypes.UPDATE_POST, payload: newPost })
  try {
    await patchDataAPI(`comment/${comment._id}/like`,null, auth.token)
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
}

export const unlikeComment = ({ comment, post, auth }) => async (dispatch) => {
  const newComment = { ...comment, likes: DeleteData(comment.likes, auth.user._id) }

  const newComments = EditData(post.comments, comment._id, newComment)

  const newPost = { ...post, comments: newComments }

  dispatch({ type: postTypes.UPDATE_POST, payload: newPost })
  try {
    await patchDataAPI(`comment/${comment._id}/unlike`,null, auth.token)
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
}
