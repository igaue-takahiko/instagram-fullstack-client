import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { alertReducer } from "../globalState/alert/reducers";
import { themeReducer } from "../globalState/theme/reducers";
import { statusReducer } from "../globalState/status/reducers";
import { modalReducer } from "../globalState/modal/reducers";
import { authReducer } from "../auth/reducers";
import { profileReducer } from "../profile/reducers";
import { homePostReducer } from "../homePost/reducers";
import { detailPostReducer } from "../detailPost/reducers";

const rootReducer = combineReducers({
  alert: alertReducer,
  theme: themeReducer,
  modal: modalReducer,
  status: statusReducer,
  auth: authReducer,
  profile: profileReducer,
  homePosts: homePostReducer,
  detailPost: detailPostReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
