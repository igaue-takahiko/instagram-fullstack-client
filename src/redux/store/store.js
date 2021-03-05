import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { authReducer } from "../auth/reducers";
import { alertReducer } from "../globalState/alert/reducers";
import { themeReducer } from "../globalState/theme/reducers";
import { profileReducer } from "../profile/reducers";
import { statusReducer } from "../globalState/status/reducers";
import { postReducer } from "../post/reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  theme: themeReducer,
  profile: profileReducer,
  status: statusReducer,
  homePost: postReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
