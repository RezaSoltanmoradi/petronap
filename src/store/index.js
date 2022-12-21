import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "./order-slice";
import userSlice from "./user-slice";
import uploadFileSlice from "./uploadFile-slice";

export const initStore = configureStore({
    reducer: {
        user: userSlice,
        order: orderSlice,
        upload: uploadFileSlice,
    },
});
