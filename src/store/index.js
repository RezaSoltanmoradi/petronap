import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "./order-slice";
import userSlice from "./user-slice";
import uploadFileSlice from "./uploadFile-slice";

import { combineReducers } from "redux";

import { persistReducer, persistStore } from "reduxjs-toolkit-persist";
import storageSession from "reduxjs-toolkit-persist/lib/storage/session";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const presistConfig = {
    storage: storageSession,
    key: "root",
    whitelist: ["user", "order", "upload"],
};
const rootReducer = combineReducers({
    user: userSlice,
    order: orderSlice,
    upload: uploadFileSlice,
});
const presitedReducer = persistReducer(presistConfig, rootReducer);

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false,
});

export const initStore = configureStore({
    reducer: presitedReducer,
    middleware: customizedMiddleware,
});
export const presister = persistStore(initStore);
