import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
    {
      caseId: "1",
      notes: [
        {
          id: "1",
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
      const indexConv = state.value.findIndex(
        (chat) => chat.caseId === action.payload.caseId
      );
      if (indexConv >= 0) {
        state.value[indexConv].notes = [
          ...state.value[indexConv].notes,
          action.payload.message,
        ];
      } else {
        state.value.push({
          caseId: action.payload.caseId,
          notes: [action.payload.message],
        });
      }
    },
  },
});

export const { addNote, addNewCaseNotes } = notesSlice.actions;
export const selectNotesById = (id) => (state) =>
  state.notes.value.find((chat) => chat.caseId === id)?.notes;
export default notesSlice.reducer;
