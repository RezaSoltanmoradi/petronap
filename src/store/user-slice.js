import { createSlice } from "@reduxjs/toolkit";
import { ROLES } from "src/helper/types";

const initialState = {
    accessToken: null,
    refreshToken: null,
    userId:null,
    isLogin: false,
    otp: {
        requestId: null,
        receiver: "",
        password: null,
    },
    type: {
        id: "1",
        title: "حقیقی",
        name: "individual person",
    },
    role: { name: "producer", id: "3", title: "تولید کننده " },
    
    nationality: {
        id: "0",
        title: "شرکت ایرانی",
        name: "iranian",
    },
};
export const UserSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        getType(state, action) {
            state.type = action.payload;
        },
        getRole(state, action) {
            const roleId = action.payload;
            const findRole = ROLES.find(role => role.id === roleId);
            state.role = findRole;
        },
        getNationality(state, action) {
            state.nationality = action.payload;
        },
        getLoginStaus(state, action) {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.userId = action.payload.userId;
            if (state.accessToken) {
                state.isLogin = true;
            }
        },
        getOtpData(state, action) {
            const newItem = action.payload;
            const updatedOtp = { ...state.otp, ...newItem };
            state.otp = updatedOtp;
        },
    },
});
export const { getType, getRole, getNationality, getLoginStaus, getOtpData } =
    UserSlice.actions;
export default UserSlice.reducer;
