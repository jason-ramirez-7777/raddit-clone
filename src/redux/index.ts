import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import postReducer from "@/redux/postSlice";

export const store = configureStore({
  reducer: {
    post: postReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;