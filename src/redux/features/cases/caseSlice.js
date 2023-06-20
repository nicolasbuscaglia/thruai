import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
    {
      caseId: "1",
      name: "Summarize Case",
      type: "DNAVisit - Dev",
      filesCount: 13,
      daysLeft: 7,
      uploadStatus: 85,
      team: ["KA", "RR", "Test", "Demo"],
    },
    {
      caseId: "2",
      name: "Genetic test summary",
      type: "DNAVisit - Clinical",
      filesCount: 5,
      daysLeft: 1,
      uploadStatus: 75,
      team: ["KA", "RR"],
    },
    {
      caseId: "3",
      name: "Patient Visit Summary",
      type: "DNAVisit - Clinical",
      filesCount: 3,
      daysLeft: 8,
      uploadStatus: 100,
      team: ["KA", "RR", "Demo"],
    },
    {
      caseId: "4",
      name: "Summarize Case",
      type: "DNAVisit - Clinical",
      filesCount: 1,
      daysLeft: 10,
      uploadStatus: 35,
      team: ["KA", "RR", "Test 1", "Test 2", "Test 3", "Test 4", "Test 5"],
    },
    {
      caseId: "5",
      name: "Genetic test summary",
      type: "DNAVisit - Dev",
      filesCount: 2,
      daysLeft: 14,
      uploadStatus: 20,
      team: ["KA", "RR", "Test 1"],
    },
  ],
};

export const casesSlice = createSlice({
  name: "cases",
  initialState,
  reducers: {
    addCase: (state, action) => {
      state.value.push({
        ...action.payload,
      });
    },
  },
});

export const { addCase } = casesSlice.actions;
export const selectAllCases = (state) => state.cases.value;
export default casesSlice.reducer;
