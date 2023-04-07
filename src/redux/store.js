import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import userReducer from "./features/user/userSlice";
import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from "redux-persist";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: customizedMiddleware

})

export const persistor = persistStore(store)

