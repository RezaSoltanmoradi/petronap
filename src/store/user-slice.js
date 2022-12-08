import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin: false,
    type: {
        id: "1",
        title: "حقیقی",
        name: "individual person",
    },
    role: {
        id: "3",
        title: "تولید کننده",
        name: "producer",
    },
    nationality: {
        id: "0",
        title: "شرکت ایرانی",
        name: "iranian",
    },
    accessToken: null,
};
export const UserSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        getType(state, action) {
            state.type = action.payload;
        },
        getRole(state, action) {
            state.role = action.payload;
        },
        getNationality(state, action) {
            state.nationality = action.payload;
        },
        getAccessToken(state, action) {
            state.accessToken = action.payload;

            if (state.accessToken) {
                state.isLogin = true;
            }
        },
    },
});
export const { getType, getRole, getNationality, getAccessToken } =
    UserSlice.actions;
export default UserSlice.reducer;
