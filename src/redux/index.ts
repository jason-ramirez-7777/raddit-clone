import { configureStore } from "@reduxjs/toolkit";
import postReducer from "@/redux/postSlice";

const store = configureStore({
  reducer: {
    postReducer
  }
});

export default store;
export type AppDispatch = typeof store.dispatch;