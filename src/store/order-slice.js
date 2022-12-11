import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    order: {},
    orders: [],
};
export const orderSlice = createSlice({
    name: "order",
    initialState: initialState,
    reducers: {
        getOrder(state, action) {
            const newItem = action.payload;
            const updatedOrder = { ...state.order, ...newItem };
            state.order = updatedOrder;
            if (state.order.product) {
                state.orders = [...state.orders, state.order];
                state.order = {};
            }
        },
    },
});
export const { getOrder } = orderSlice.actions;
export default orderSlice.reducer;
