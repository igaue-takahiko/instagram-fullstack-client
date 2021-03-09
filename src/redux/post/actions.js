import { globalTypes } from '../globalState/types';
import { postTypes } from './types';
import { imageUpload } from '../../utils/imageUpdated';
import { postDataAPI, getDataAPI } from '../../utils/fetchData';

export const createPost = ({ content, images, auth }) => async (dispatch) => {
  let media = []
  try {
    dispatch({ type: globalTypes.ALERT, payload: { loading: true } })
    if (images.length > 0) {
      media = await imageUpload(images)
    }

    const res = await postDataAPI("posts", { content, images: media }, auth.token)
    dispatch({ type: postTypes.CREATE_POST, payload: res.data.newPost })
    dispatch({ type: globalTypes.ALERT, payload: { loading: false } })
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg }
    })
  }
}

export const getPosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: postTypes.LOADING_POST, payload: true })
    const res = await getDataAPI("posts", token)
    dispatch({
      type: postTypes.GET_POSTS,
      payload: res.data
    })
    dispatch({ type: postTypes.LOADING_POST, payload: false })
  } catch (error) {
    dispatch({
      type: globalTypes.ALERT,
      payload: { error: error.response.data.msg }
    })
  }
}
