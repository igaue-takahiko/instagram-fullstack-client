import { globalTypes } from "../globalState/types";
import { homePostTypes } from "./types";
import { imageUpload } from "../../utils/imageUpdated";
import {
  postDataAPI,
  getDataAPI,
  patchDataAPI,
  deleteDataAPI,
} from "../../utils/fetchData";
import { EditData, DeleteData } from "../globalState/helpers";

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
      type: homePostTypes.CREATE_POST,
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
    dispatch({ type: homePostTypes.LOADING_POST, payload: true });
    const res = await getDataAPI("posts", token);
    dispatch({
      type: homePostTypes.GET_POSTS,
      payload: { ...res.data, page: 2 },
    });
    dispatch({ type: homePostTypes.LOADING_POST, payload: false });
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

    dispatch({ type: homePostTypes.UPDATE_POST, payload: res.data.newPost });
    dispatch({ type: globalTypes.ALERT, payload: { success: res.data.msg } });
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const deletePost = ({ post, auth }) => async (dispatch) => {
  dispatch({ type: homePostTypes.DELETE_POST, payload: post });

  try {
    await deleteDataAPI(`post/${post._id}`, auth.token);
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const likePost = ({ post, auth, socket }) => async (dispatch) => {
  const newPost = { ...post, likes: [...post.likes, auth.user] };
  dispatch({ type: homePostTypes.UPDATE_POST, payload: newPost });

  socket.emit("likePost", newPost);

  try {
    await patchDataAPI(`post/${post._id}/like`, null, auth.token);
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const unLikePost = ({ post, auth, socket }) => async (dispatch) => {
  const newPost = {
    ...post,
    likes: post.likes.filter((like) => like._id !== auth.user._id),
  };
  dispatch({ type: homePostTypes.UPDATE_POST, payload: newPost });

  socket.emit("unLikePost", newPost);

  try {
    await patchDataAPI(`post/${post._id}/unlike`, null, auth.token);
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const createComment = ({ post, newComment, auth, socket }) => async (
  dispatch
) => {
  const newPost = { ...post, comments: [...post.comments, newComment] };
  dispatch({ type: homePostTypes.UPDATE_POST, payload: newPost });

  try {
    const data = { ...newComment, postId: post._id, postUserId: post.user._id };
    const res = await postDataAPI("comment", data, auth.token);

    const newData = { ...res.data.newComment, user: auth.user };
    const newPost = { ...post, comments: [...post.comments, newData] };
    dispatch({ type: homePostTypes.UPDATE_POST, payload: newPost });

    //Socket
    socket.emit("createComment", newPost);
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

  dispatch({ type: homePostTypes.UPDATE_POST, payload: newPost });

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
  const newComment = { ...comment, likes: [...comment.likes, auth.user] };

  const newComments = EditData(post.comments, comment._id, newComment);

  const newPost = { ...post, comments: newComments };

  dispatch({ type: homePostTypes.UPDATE_POST, payload: newPost });
  try {
    await patchDataAPI(`comment/${comment._id}/like`, null, auth.token);
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const unlikeComment = ({ comment, post, auth }) => async (dispatch) => {
  const newComment = {
    ...comment,
    likes: DeleteData(comment.likes, auth.user._id),
  };

  const newComments = EditData(post.comments, comment._id, newComment);

  const newPost = { ...post, comments: newComments };

  dispatch({ type: homePostTypes.UPDATE_POST, payload: newPost });
  try {
    await patchDataAPI(`comment/${comment._id}/unlike`, null, auth.token);
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const deleteComment = ({ post, comment, auth, socket }) => async (dispatch) => {
  const deleteArr = [
    ...post.comments.filter((cm) => cm.reply === comment._id),
    comment,
  ];

  const newPost = {
    ...post,
    comments: post.comments.filter(
      (cm) => !deleteArr.find((da) => cm._id === da._id)
    ),
  };

  dispatch({ type: homePostTypes.UPDATE_POST, payload: newPost });

  socket.emit('deleteComment', newPost)
  try {
    deleteArr.forEach((item) => {
      deleteDataAPI(`comment/${item._id}`, auth.token);
    });
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const savePost = ({ post, auth }) => async (dispatch) => {
  const newUser = { ...auth.user, saved: [...auth.user.saved, post._id] };
  dispatch({ type: globalTypes.AUTH, payload: { ...auth, user: newUser } });

  try {
    await patchDataAPI(`savePost/${post._id}`, null, auth.token);
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const unSavePost = ({ post, auth }) => async (dispatch) => {
  const newUser = {
    ...auth.user,
    saved: auth.user.saved.filter((id) => id !== post._id),
  };
  dispatch({ type: globalTypes.AUTH, payload: { ...auth, user: newUser } });

  try {
    await patchDataAPI(`unSavePost/${post._id}`, null, auth.token);
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};
