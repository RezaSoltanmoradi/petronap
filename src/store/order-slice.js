import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contractType: null,
};
const orderSlice = createSlice({
    name: "order",
    initialState: initialState,
    reducers: {
        getContractType(state, action) {
            state.contractType = action.payload;
        },
        resetContractType: () => initialState
    },
});
export const { getContractType, resetContractType } = orderSlice.actions;
export default orderSlice.reducer;
