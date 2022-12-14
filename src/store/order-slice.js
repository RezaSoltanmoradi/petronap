import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contractType: null,
};
export const orderSlice = createSlice({
    name: "order",
    initialState: initialState,
    reducers: {
        getContractType(state, action) {
            state.contractType = action.payload;
        },
    },
});
export const { getContractType } = orderSlice.actions;
export default orderSlice.reducer;
