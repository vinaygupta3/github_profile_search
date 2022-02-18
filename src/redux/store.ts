import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Reducers from "./reducers";
const initialState = {
  users: {
    items: [],
    total_count: 0,
    incomplete_results: false,
  },
  loading: false,
  repos: [],
  user: {},
  error: null,
};
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  Reducers,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
