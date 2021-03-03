import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { authReducer } from "../auth/reducers";
import { alertReducer } from "../alert/reducers";
import { themeReducer } from "../theme/reducers";
import { profileReducer } from "../profile/reducers";
import { statusReducer } from "../status/reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  theme: themeReducer,
  profile: profileReducer,
  status: statusReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
