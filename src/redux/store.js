import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"
import authReducer from "./slices/authSlice.js";
import usersReducer from "./slices/userSlice.js";

const persistConfig = {
  key : "root",
  version : 1,
  storage
}

const reducer = combineReducers({
  auth: authReducer,
  user: usersReducer,
})
const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer
});

export default store;
