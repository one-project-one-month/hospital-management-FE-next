import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// Types for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
