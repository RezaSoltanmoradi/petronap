import { createSlice } from "@reduxjs/toolkit";
import { ROLES } from "src/helper/types";

const initialState = {
    accessToken: null,
    refreshToken: null,
    isLogin: false,
    otp: {
        requestId: null,
        receiver: "",
        companyName: null,
        profilePicture: null,
    },
    type: {
        id: "1",
        title: "حقیقی",
        name: "individual person",
    },

    oldRole: {
        id: "0",
        title: "ناشناس",
        name: "unknown",
    },
    role: {
        id: "0",
        title: "ناشناس",
        name: "unknown",
    },
};
const userSlice = createSlice({
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
        getOldRole(state, action) {
            const roleId = action.payload;
            const findRole = ROLES.find(role => role.id === roleId);
            state.oldRole = findRole;
        },

        getLoginStaus(state, action) {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;

            if (state.accessToken) {
                state.isLogin = true;
            } else {
                state.isLogin = false;
            }
        },
        getOtpData(state, action) {
            const newItem = action.payload;
            const updatedOtp = { ...state.otp, ...newItem };
            state.otp = updatedOtp;
        },

        logout: () => initialState,
    },
});
export const {
    getType,
    getRole,
    getLoginStaus,
    getOtpData,
    getOldRole,
    logout,
} = userSlice.actions;

export default userSlice.reducer;
