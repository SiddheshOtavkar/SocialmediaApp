import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import { thunk } from 'redux-thunk';
import { authReducer } from "./Auth/auth.reducer";
import { messageReducer } from "./Message/message.reducer";
import { postReducer } from "./Post/post.reducer";

const rootReducers = combineReducers({
  auth: authReducer,
  message: messageReducer,
  post: postReducer,
})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk))
/**
 * Thunk middleware in Redux allows you to write special kinds of functions, called "thunks," as action creators. These thunks can do more than just return plain objects; they can also perform tasks like fetching data from a server. Thunks are useful for handling asynchronous operations in Redux, like loading data from an API, because they give you a way to organize your asynchronous logic alongside your regular Redux actions.
 */

// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { authReducer } from "./Auth/auth.reducer";
// import { messageReducer } from "./Message/message.reducer";

// const rootReducer = combineReducers({
//   auth: authReducer,
//   message: messageReducer,
// });

// export const store = configureStore({
//   reducer: rootReducer,
// });

