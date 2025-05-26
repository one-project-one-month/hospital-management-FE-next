import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authReducer from "./authSlice";
import patientReducer from "./patientSlice";
import doctorReducer from "./doctorSlice";
import medicineReducer from "./medicineSlice";

// Combine reducers if you have multiple slices
const rootReducer = combineReducers({
  auth: authReducer,
  patients: patientReducer,
  doctors: doctorReducer,
  medicines: medicineReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
