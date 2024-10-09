import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./authSlice";
import darkAndWhiteSlice from "./darkAndWhiteSlice";
import postSlice from "./postSlice";
import bookMarkSlice from "./bookMarkSlice";
import { composeWithDevTools } from "@redux-devtools/extension";
import socketSlice from "./socketSlice";
import chatSlice from "./chatSlice";
import notificationSlice from "./notificationSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  allPost: postSlice,
  bookMarkPost: bookMarkSlice,
  socketIo: socketSlice,
  onlineUsers: chatSlice,
  appNotification: notificationSlice,
  darkMode: darkAndWhiteSlice,
});

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer,
  composeWithDevTools()
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store;
