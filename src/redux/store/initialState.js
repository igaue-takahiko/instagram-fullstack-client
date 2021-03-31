export const initialState = {
  auth: {},
  alert: {},
  theme: false,
  modal: false,
  profile: {
    loading: false,
    ids: [],
    users: [],
    posts: [],
  },
  status: false,
  homePost: {
    loading: false,
    posts: [],
    result: 0,
    page: 2,
  },
  detailPost: []
};
