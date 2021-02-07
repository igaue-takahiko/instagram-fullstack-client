import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { authReducer } from '../auth/reducers';
import { notifyReducer } from '../notify/reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  notify: notifyReducer,
})

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
