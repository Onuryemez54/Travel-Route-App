import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import citiesReducer from "../features/cities/citiesSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sidebarReducer from "../features/sidebar/sidebarSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  cities: citiesReducer,
  sidebar: sidebarReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cities", "sidebar"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
