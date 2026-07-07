import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import type { WebStorage } from "redux-persist/es/types";
import global from "./modules/global";
import tabs from "./modules/tabs";
import auth from "./modules/auth";
import user from "./modules/user";

// create reducer
const reducer = combineReducers({ global, tabs, auth, user });
const persistStorage = ("getItem" in storage ? storage : (storage as unknown as { default: WebStorage }).default) as WebStorage;

// redux persist
const persistConfig = {
  key: "redux-state",
  storage: persistStorage,
  blacklist: ["auth"]
};
const persistReducerConfig = persistReducer(persistConfig, reducer);

// store
export const store = configureStore({
  reducer: persistReducerConfig,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true
});

// create persist store
export const persistor = persistStore(store);

// redux hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch = () => useReduxDispatch<AppDispatch>();
