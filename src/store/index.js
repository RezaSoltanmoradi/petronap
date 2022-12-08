import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "./order-slice";
import userSlice from "./user-slice";

export const initStore = configureStore({
    reducer: {
        user: userSlice,
        order: orderSlice,
    },
});
