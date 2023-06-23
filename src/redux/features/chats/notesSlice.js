import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
    {
      caseId: "1",
      notes: [
        {
          noteId: "1",
          createdOn: "1687208394743",
          user: "Jhon Doe",
          content: "This is a test note",
        },
      ],
    },
    {
      caseId: "2",
      notes: [],
    },
  ],
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNewCaseNotes: (state, action) => {
      state.value.push(action.payload);
    },
    addNote: (state, action) => {
      const oneCase = state.value.find(
        (oneCase) => oneCase.caseId === action.payload.caseId
      );
      if (oneCase) {
        oneCase.notes = [...oneCase.notes, action.payload.message];
      }
    },
  },
});

export const { addNote, addNewCaseNotes } = notesSlice.actions;

export const selectNotesByCaseId = (caseId) => (state) =>
  state.notes.value.find((oneCase) => oneCase.caseId === caseId)?.notes;

export default notesSlice.reducer;
