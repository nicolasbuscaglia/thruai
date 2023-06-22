import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: "",
  newCase: {
    files: [],
  },
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
    manageUploadFiles: (state, action) => {
      state.newCase.files = action.payload.files;
    },
    removeFileById: (state, action) => {
      state.newCase.files = state.newCase.files.filter(
        (file) => file.id != action.payload.fileId
      );
    },
    setFileCleanCheck: (state, action) => {
      state.newCase.files = state.newCase.files.map((file) =>
        file.id === action.payload.fileId
          ? { ...file, clean: action.payload.clean }
          : file
      );
    },
  },
});

export const {
  updateFilter,
  manageUploadFiles,
  removeFileById,
  setFileCleanCheck,
} = uiSlice.actions;

export const selectFilter = (state) => state.ui.filter;

export const selectNewFiles = (state) => state.ui.newCase.files;

export default uiSlice.reducer;
