import { globalTypes } from "../globalState/types";
import { postTypes } from "./types";
import { imageUpload } from "../../utils/imageUpdated";
import { postDataAPI, getDataAPI, patchDataAPI } from "../../utils/fetchData";

export const createPost = ({ content, images, auth }) => async (dispatch) => {
  let media = [];
  try {
    dispatch({ type: globalTypes.ALERT, payload: { loading: true } });
    if (images.length > 0) {
      media = await imageUpload(images);
    }

    const res = await postDataAPI(
      "posts",
      { content, images: media },
      auth.token
    );

    dispatch({
      type: postTypes.CREATE_POST,
      payload: { ...res.data.newPost, user: auth.user },
    });
    dispatch({ type: globalTypes.ALERT, payload: { loading: false } });
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const getPosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: postTypes.LOADING_POST, payload: true });
    const res = await getDataAPI("posts", token);
    dispatch({
      type: postTypes.GET_POSTS,
      payload: res.data,
    });
    dispatch({ type: postTypes.LOADING_POST, payload: false });
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const updatePost = ({ content, images, auth, status }) => async (
  dispatch
) => {
  let media = [];
  const imageNewUrl = images.filter((image) => !image.url);
  const imageOldUrl = images.filter((image) => image.url);

  if (
    status.content === content &&
    imageNewUrl.length === 0 &&
    imageOldUrl.length === status.images.length
  ) {
    return;
  }

  try {
    dispatch({ type: globalTypes.ALERT, payload: { loading: true } });
    if (imageNewUrl.length > 0) {
      media = await imageUpload(imageNewUrl);
    }

    const res = await patchDataAPI(
      `post/${status._id}`,
      {
        content,
        images: [...imageOldUrl, ...media],
      },
      auth.token
    );

    dispatch({ type: postTypes.UPDATE_POST, payload: res.data.newPost });
    dispatch({ type: globalTypes.ALERT, payload: { success: res.data.msg } });
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const likePost = ({ post, auth }) => async (dispatch) => {
  const newPost = { ...post, likes: [...post.likes, auth.user] };
  dispatch({ type: postTypes.UPDATE_POST, payload: newPost });
  try {
    await patchDataAPI(`post/${post._id}/like`, null, auth.token);
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const unLikePost = ({ post, auth }) => async (dispatch) => {
  const newPost = { ...post, likes: post.likes.filter(like => like._id !== auth.user._id) };
  dispatch({ type: postTypes.UPDATE_POST, payload: newPost });
  try {
    await patchDataAPI(`post/${post._id}/unlike`, null, auth.token);
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};
