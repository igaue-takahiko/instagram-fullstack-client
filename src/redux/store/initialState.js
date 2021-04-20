export const initialState = {
  auth: {},
  alert: {},
  theme: false,
  modal: false,
  socket: [],
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
  detailPost: [],
  discover: {
    loading: false,
    posts: [],
    result: 9,
    page: 2,
    firstLoad: false,
  },
  suggestions: {
    loading: false,
    users: [],
  },
  notify: {
    loading: false,
    data: [],
    sound: false,
  },
  message: {
    users: [],
    resultUsers: 0,
    data: [],
    resultData: 0,
    firstLoad: false,
  },
};
