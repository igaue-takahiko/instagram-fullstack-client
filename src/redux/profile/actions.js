import { globalTypes } from "../globalState/types";
import { profileTypes } from "./types";
import { DeleteData } from "../globalState/helpers";
import { getDataAPI, patchDataAPI } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpdated";

export const getProfileUsers = ({ id, auth }) => async (dispatch) => {
  dispatch({ type: profileTypes.GET_ID, payload: id });
  try {
    dispatch({ type: profileTypes.LOADING, payload: true });

    const res = getDataAPI(`user/${id}`, auth.token);
    const res1 = getDataAPI(`user_posts/${id}`, auth.token);

    const users = await res;
    const posts = await res1;

    dispatch({ type: profileTypes.GET_USER, payload: users.data });

    dispatch({ type: profileTypes.GET_POSTS, payload: { ...posts.data, _id: id, page: 2 } });

    dispatch({ type: profileTypes.LOADING, payload: false });
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const updateProfileUser = ({ userData, avatar, auth }) => async (
  dispatch
) => {
  if (!userData.fullName) {
    return dispatch({
      type: globalTypes.ALERT,
      payload: { error: "Please add your full name." },
    });
  }
  if (userData.fullName.length > 25) {
    return dispatch({
      type: globalTypes.ALERT,
      payload: { error: "Your full name too long." },
    });
  }
  if (userData.story.length > 200) {
    return dispatch({
      type: globalTypes.ALERT,
      payload: { error: "Your full story too long." },
    });
  }

  try {
    let media;
    dispatch({ type: globalTypes.ALERT, payload: { loading: true } });
    if (avatar) {
      media = await imageUpload([avatar]);
    }

    const res = await patchDataAPI(
      "user",
      {
        ...userData,
        avatar: avatar ? media[0].url : auth.user.avatar,
      },
      auth.token
    );

    dispatch({
      type: globalTypes.ALERT,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          ...userData,
          avatar: avatar ? media[0].url : auth.user.avatar,
        },
      },
    });
    dispatch({ type: globalTypes.ALERT, payload: { loading: false } });
    dispatch({ type: globalTypes.ALERT, payload: { success: res.data.msg } });
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const follow = ({ users, user, auth, socket }) => async (dispatch) => {
  let newUser;

  if (users.every((item) => item._id !== user._id)) {
    newUser = { ...user, followers: [...user.followers, auth.user] };
  } else {
    users.forEach((item) => {
      if (item._id === user._id) {
        newUser = { ...item, followers: [...item.followers, auth.user] };
      }
    });
  }

  dispatch({ type: profileTypes.FOLLOW, payload: newUser });
  dispatch({
    type: globalTypes.AUTH,
    payload: {
      ...auth,
      user: { ...auth.user, following: [...auth.user.following, newUser] },
    },
  });

  try {
    const res = await patchDataAPI(`user/${user._id}/follow`, null, auth.token);
    socket.emit('follow', res.data.newUser)
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const unFollow = ({ users, user, auth, socket }) => async (dispatch) => {
  let newUser;

  if (users.every((item) => item._id !== user._id)) {
    newUser = { ...user, followers: DeleteData(user.followers, auth.user._id) };
  } else {
    users.forEach((item) => {
      if (item._id === user._id) {
        newUser = {
          ...item,
          followers: DeleteData(item.followers, auth.user._id),
        };
      }
    });
  }

  dispatch({ type: profileTypes.UN_FOLLOW, payload: newUser });
  dispatch({
    type: globalTypes.AUTH,
    payload: {
      ...auth,
      user: {
        ...auth.user,
        following: DeleteData(auth.user.following, newUser._id),
      },
    },
  });

  try {
    const res = await patchDataAPI(`user/${user._id}/unFollow`, null, auth.token);
    socket.emit('unFollow', res.data.newUser)
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};
