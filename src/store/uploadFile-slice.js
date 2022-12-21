import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    uploadFiles: {},
    isShowUpload: false,
    // acceptType | fileType | view | title  | fileId | 
    // lable | fileItem | value:dynamic| fileName:dynamic
    uploadFileProps: {},
};
const uploadFileSlice = createSlice({
    name: "uploadFile",
    initialState: initialState,
    reducers: {
        showUploadModal(state, action) {
            if (action.payload) {
                state.isShowUpload = true;
                const newPropName = action.payload;
                const updatedFileProps = {
                    ...state.uploadFileProps,
                    ...newPropName,
                };
                state.uploadFileProps = updatedFileProps;
            } else {
                state.isShowUpload = false;
                state.uploadFileProps = {};
            }
        },
        setUploadFiles(state, action) {
            const newUploadFile = action.payload;
            const updatedUploadFiles = {
                ...state.uploadFiles,
                ...newUploadFile,
            };
            state.uploadFiles = updatedUploadFiles;
        },
        resetUploader: () => initialState,
    },
});
export const { setUploadFiles, showUploadModal, resetUploader } =
    uploadFileSlice.actions;
export default uploadFileSlice.reducer;
