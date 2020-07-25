import { createStore, combineReducers } from "redux";
import listReducer from "./listReducer";
import userReducer from "./userReducer";

const reducer = combineReducers({ user: userReducer, lists: listReducer });

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
