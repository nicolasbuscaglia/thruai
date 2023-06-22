import { createSelector, createSlice } from "@reduxjs/toolkit";
import { useParams } from "next/navigation";

const initialState = {
  value: [
    {
      caseId: "1",
      lastUpdated: "12 April at 09:28 PM",
      files: [
        {
          id: 1,
          name: "PatientRecords_June2023.csv",
          type: ".csv",
          size: "34234",
          cleaningStatus: 100,
          uploadedOn: "1687208394743",
        },
        {
          id: 2,
          name: "ClinicalTrialData_Q3_2023.xlsx",
          type: ".xlsx",
          size: "234234234",
          cleaningStatus: 100,
          uploadedOn: "1687208394743",
        },
        {
          id: 3,
          name: "InsuranceClaims_2023_Q2.json",
          type: ".json",
          size: "234234234",
          cleaningStatus: 100,
          uploadedOn: "1687208394743",
        },
        {
          id: 4,
          name: "PrescriptionData_May2023.csv",
          type: ".csv",
          size: "2343243324",
          cleaningStatus: 75,
          uploadedOn: "1687208394743",
        },
        {
          id: 5,
          name: "HospitalAdmissions_2023Q1.xlsx",
          type: ".xlsx",
          size: "2343243324",
          cleaningStatus: 80,
          uploadedOn: "1687208394743",
        },
        {
          id: 6,
          name: "EmergencyRoom_Visits_Jan2023.csv",
          type: ".csv",
          size: "2343243324",
          cleaningStatus: 60,
          uploadedOn: "1687208394743",
        },
        {
          id: 7,
          name: "SurgicalProcedures_2023.json",
          type: ".json",
          size: "2343243324",
          cleaningStatus: 53,
          uploadedOn: "1687208394743",
        },
        {
          id: 8,
          name: "PatientRecords_June2023.csv",
          type: ".csv",
          size: "2343243324",
          cleaningStatus: 20,
          uploadedOn: "1687208394743",
        },
        {
          id: 9,
          name: "ImmunizationRecords_2023.csv",
          type: ".csv",
          size: "2343243324",
          cleaningStatus: 98,
          uploadedOn: "1687208394743",
        },
        {
          id: 10,
          name: "LabResults_Feb2023.xlsx",
          type: ".xlsx",
          size: "2343243324",
          cleaningStatus: 70,
          uploadedOn: "1687208394743",
        },
        {
          id: 11,
          name: "MentalHealthStats_2023Q2.json",
          type: ".json",
          size: "2343243324",
          cleaningStatus: 100,
          uploadedOn: "1687208394743",
        },
        {
          id: 12,
          name: "MentalHealthStats_2023Q3.json",
          type: ".json",
          size: "2343243324",
          cleaningStatus: 40,
          uploadedOn: "1687208394743",
        },
      ],
    },
    {
      caseId: "2",
      lastUpdated: "12 April at 09:28 PM",
      files: [
        {
          id: 1,
          name: "PatientRecords_June2023.csv",
          type: ".csv",
          size: "42342352",
          cleaningStatus: 100,
          uploadedOn: "1687208394743",
        },
        {
          id: 2,
          name: "ClinicalTrialData_Q3_2023.xlsx",
          type: ".xlsx",
          size: "4234233452",
          cleaningStatus: 90,
          uploadedOn: "1687208394743",
        },
        {
          id: 3,
          name: "InsuranceClaims_2023_Q2.json",
          type: ".json",
          size: "433452",
          cleaningStatus: 100,
          uploadedOn: "1687208394743",
        },
        {
          id: 4,
          name: "PrescriptionData_May2023.csv",
          type: ".csv",
          size: "42342352",
          cleaningStatus: 75,
          uploadedOn: "1687208394743",
        },
        {
          id: 5,
          name: "HospitalAdmissions_2023Q1.xlsx",
          type: ".xlsx",
          size: "42342352",
          cleaningStatus: 80,
          uploadedOn: "1687208394743",
        },
        {
          id: 6,
          name: "EmergencyRoom_Visits_Jan2023.csv",
          type: ".csv",
          size: "42342352",
          cleaningStatus: 60,
          uploadedOn: "1687208394743",
        },
        {
          id: 7,
          name: "SurgicalProcedures_2023.json",
          type: ".json",
          size: "42342352",
          cleaningStatus: 53,
          uploadedOn: "1687208394743",
        },
        {
          id: 8,
          name: "PatientRecords_June2023.csv",
          type: ".csv",
          size: "42342352",
          cleaningStatus: 20,
          uploadedOn: "1687208394743",
        },
        {
          id: 9,
          name: "ImmunizationRecords_2023.csv",
          type: ".csv",
          size: "42342352",
          cleaningStatus: 98,
          uploadedOn: "1687208394743",
        },
        {
          id: 10,
          name: "LabResults_Feb2023.xlsx",
          type: ".xlsx",
          size: "42342352",
          cleaningStatus: 70,
          uploadedOn: "1687208394743",
        },
        {
          id: 11,
          name: "MentalHealthStats_2023Q2.json",
          type: ".json",
          size: "42342352",
          cleaningStatus: 100,
          uploadedOn: "1687208394743",
        },
        {
          id: 12,
          name: "MentalHealthStats_2023Q3.json",
          type: ".json",
          size: "42342352",
          cleaningStatus: 40,
          uploadedOn: "1687208394743",
        },
      ],
    },
    {
      caseId: "3",
      lastUpdated: "12 April at 09:28 PM",
      files: [
        {
          id: 1,
          name: "PatientRecords_June2023.csv",
          type: ".csv",
          size: "42342352",
          cleaningStatus: 100,
          uploadedOn: "1687208394743",
        },
        {
          id: 2,
          name: "ClinicalTrialData_Q3_2023.xlsx",
          type: ".xlsx",
          size: "4234233452",
          cleaningStatus: 100,
          uploadedOn: "1687208394743",
        },
        {
          id: 3,
          name: "InsuranceClaims_2023_Q2.json",
          type: ".json",
          size: "433452",
          cleaningStatus: 100,
          uploadedOn: "1687208394743",
        },
        {
          id: 4,
          name: "PrescriptionData_May2023.csv",
          type: ".csv",
          size: "42342352",
          cleaningStatus: 75,
          uploadedOn: "1687208394743",
        },
        {
          id: 5,
          name: "HospitalAdmissions_2023Q1.xlsx",
          type: ".xlsx",
          size: "42342352",
          cleaningStatus: 80,
          uploadedOn: "1687208394743",
        },
        {
          id: 6,
          name: "EmergencyRoom_Visits_Jan2023.csv",
          type: ".csv",
          size: "42342352",
          cleaningStatus: 60,
          uploadedOn: "1687208394743",
        },
        {
          id: 7,
          name: "SurgicalProcedures_2023.json",
          type: ".json",
          size: "42342352",
          cleaningStatus: 53,
          uploadedOn: "1687208394743",
        },
        {
          id: 8,
          name: "PatientRecords_June2023.csv",
          type: ".csv",
          size: "42342352",
          cleaningStatus: 20,
          uploadedOn: "1687208394743",
        },
        {
          id: 9,
          name: "ImmunizationRecords_2023.csv",
          type: ".csv",
          size: "42342352",
          cleaningStatus: 98,
          uploadedOn: "1687208394743",
        },
        {
          id: 10,
          name: "LabResults_Feb2023.xlsx",
          type: ".xlsx",
          size: "42342352",
          cleaningStatus: 70,
          uploadedOn: "1687208394743",
        },
        {
          id: 11,
          name: "MentalHealthStats_2023Q2.json",
          type: ".json",
          size: "42342352",
          cleaningStatus: 100,
          uploadedOn: "1687208394743",
        },
        {
          id: 12,
          name: "MentalHealthStats_2023Q3.json",
          type: ".json",
          size: "42342352",
          cleaningStatus: 40,
          uploadedOn: "1687208394743",
        },
      ],
    },
    {
      caseId: "4",
      lastUpdated: "12 April at 09:28 PM",
      files: [
        {
          id: 1,
          name: "PatientRecords_June2023.csv",
          type: ".csv",
          size: "42342352",
          cleaningStatus: 100,
          uploadedOn: "1687208394743",
        },
        {
          id: 2,
          name: "ClinicalTrialData_Q3_2023.xlsx",
          type: ".xlsx",
          size: "4234233452",
          cleaningStatus: 100,
          uploadedOn: "1687208394743",
        },
        {
          id: 3,
          name: "InsuranceClaims_2023_Q2.json",
          type: ".json",
          size: "433452",
          cleaningStatus: 100,
          uploadedOn: "1687208394743",
        },
        {
          id: 4,
          name: "PrescriptionData_May2023.csv",
          type: ".csv",
          size: "42342352",
          cleaningStatus: 75,
          uploadedOn: "1687208394743",
        },
        {
          id: 5,
          name: "HospitalAdmissions_2023Q1.xlsx",
          type: ".xlsx",
          size: "42342352",
          cleaningStatus: 80,
          uploadedOn: "1687208394743",
        },
        {
          id: 6,
          name: "EmergencyRoom_Visits_Jan2023.csv",
          type: ".csv",
          size: "42342352",
          cleaningStatus: 60,
          uploadedOn: "1687208394743",
        },
        {
          id: 7,
          name: "SurgicalProcedures_2023.json",
          type: ".json",
          size: "42342352",
          cleaningStatus: 53,
          uploadedOn: "1687208394743",
        },
        {
          id: 8,
          name: "PatientRecords_June2023.csv",
          type: ".csv",
          size: "42342352",
          cleaningStatus: 20,
          uploadedOn: "1687208394743",
        },
        {
          id: 9,
          name: "ImmunizationRecords_2023.csv",
          type: ".csv",
          size: "42342352",
          cleaningStatus: 98,
          uploadedOn: "1687208394743",
        },
        {
          id: 10,
          name: "LabResults_Feb2023.xlsx",
          type: ".xlsx",
          size: "42342352",
          cleaningStatus: 70,
          uploadedOn: "1687208394743",
        },
        {
          id: 11,
          name: "MentalHealthStats_2023Q2.json",
          type: ".json",
          size: "42342352",
          cleaningStatus: 100,
          uploadedOn: "1687208394743",
        },
        {
          id: 12,
          name: "MentalHealthStats_2023Q3.json",
          type: ".json",
          size: "42342352",
          cleaningStatus: 40,
          uploadedOn: "1687208394743",
        },
      ],
    },
    {
      caseId: "5",
      lastUpdated: "12 April at 09:28 PM",
      files: [
        {
          id: 1,
          name: "PatientRecords_June2023.csv",
          type: ".csv",
          size: "42342352",
          cleaningStatus: 100,
          uploadedOn: "1687208394743",
        },
        {
          id: 2,
          name: "ClinicalTrialData_Q3_2023.xlsx",
          type: ".xlsx",
          size: "4234233452",
          cleaningStatus: 100,
          uploadedOn: "1687208394743",
        },
        {
          id: 3,
          name: "InsuranceClaims_2023_Q2.json",
          type: ".json",
          size: "433452",
          cleaningStatus: 100,
          uploadedOn: "1687208394743",
        },
        {
          id: 4,
          name: "PrescriptionData_May2023.csv",
          type: ".csv",
          size: "42342352",
          cleaningStatus: 75,
          uploadedOn: "1687208394743",
        },
        {
          id: 5,
          name: "HospitalAdmissions_2023Q1.xlsx",
          type: ".xlsx",
          size: "42342352",
          cleaningStatus: 80,
          uploadedOn: "1687208394743",
        },
        {
          id: 6,
          name: "EmergencyRoom_Visits_Jan2023.csv",
          type: ".csv",
          size: "42342352",
          cleaningStatus: 60,
          uploadedOn: "1687208394743",
        },
        {
          id: 7,
          name: "SurgicalProcedures_2023.json",
          type: ".json",
          size: "42342352",
          cleaningStatus: 53,
          uploadedOn: "1687208394743",
        },
        {
          id: 8,
          name: "PatientRecords_June2023.csv",
          type: ".csv",
          size: "42342352",
          cleaningStatus: 20,
          uploadedOn: "1687208394743",
        },
        {
          id: 9,
          name: "ImmunizationRecords_2023.csv",
          type: ".csv",
          size: "42342352",
          cleaningStatus: 98,
          uploadedOn: "1687208394743",
        },
        {
          id: 10,
          name: "LabResults_Feb2023.xlsx",
          type: ".xlsx",
          size: "42342352",
          cleaningStatus: 70,
          uploadedOn: "1687208394743",
        },
        {
          id: 11,
          name: "MentalHealthStats_2023Q2.json",
          type: ".json",
          size: "42342352",
          cleaningStatus: 100,
          uploadedOn: "1687208394743",
        },
        {
          id: 12,
          name: "MentalHealthStats_2023Q3.json",
          type: ".json",
          size: "42342352",
          cleaningStatus: 40,
          uploadedOn: "1687208394743",
        },
      ],
    },
    {
      caseId: "6",
      lastUpdated: "12 April at 09:28 PM",
      files: [
        {
          id: 1,
          name: "PatientRecords_June2023.csv",
          type: ".csv",
          size: "42342352",
          cleaningStatus: 100,
          uploadedOn: "1687208394743",
        },
        {
          id: 2,
          name: "ClinicalTrialData_Q3_2023.xlsx",
          type: ".xlsx",
          size: "4234233452",
          cleaningStatus: 100,
          uploadedOn: "1687208394743",
        },
        {
          id: 3,
          name: "InsuranceClaims_2023_Q2.json",
          type: ".json",
          size: "433452",
          cleaningStatus: 100,
          uploadedOn: "1687208394743",
        },
        {
          id: 4,
          name: "PrescriptionData_May2023.csv",
          type: ".csv",
          size: "42342352",
          cleaningStatus: 75,
          uploadedOn: "1687208394743",
        },
        {
          id: 5,
          name: "HospitalAdmissions_2023Q1.xlsx",
          type: ".xlsx",
          size: "42342352",
          cleaningStatus: 80,
          uploadedOn: "1687208394743",
        },
        {
          id: 6,
          name: "EmergencyRoom_Visits_Jan2023.csv",
          type: ".csv",
          size: "42342352",
          cleaningStatus: 60,
          uploadedOn: "1687208394743",
        },
        {
          id: 7,
          name: "SurgicalProcedures_2023.json",
          type: ".json",
          size: "42342352",
          cleaningStatus: 53,
          uploadedOn: "1687208394743",
        },
        {
          id: 8,
          name: "PatientRecords_June2023.csv",
          type: ".csv",
          size: "42342352",
          cleaningStatus: 20,
          uploadedOn: "1687208394743",
        },
        {
          id: 9,
          name: "ImmunizationRecords_2023.csv",
          type: ".csv",
          size: "42342352",
          cleaningStatus: 98,
          uploadedOn: "1687208394743",
        },
        {
          id: 10,
          name: "LabResults_Feb2023.xlsx",
          type: ".xlsx",
          size: "42342352",
          cleaningStatus: 70,
          uploadedOn: "1687208394743",
        },
        {
          id: 11,
          name: "MentalHealthStats_2023Q2.json",
          type: ".json",
          size: "42342352",
          cleaningStatus: 100,
          uploadedOn: "1687208394743",
        },
        {
          id: 12,
          name: "MentalHealthStats_2023Q3.json",
          type: ".json",
          size: "42342352",
          cleaningStatus: 40,
          uploadedOn: "1687208394743",
        },
      ],
    },
  ],
};

export const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    addFiles: (state, action) => {
      const caseIndex = state.value.findIndex(
        (file) => file.caseId === action.payload.caseId
      );
      if (caseIndex >= 0) {
        state.value[caseIndex].files = [
          ...state.value[caseIndex].files,
          ...action.payload.files,
        ];
      } else {
        state.value.push({
          caseId: action.payload.caseId,
          files: [...action.payload.files],
        });
      }
    },
    addMoreFiles: (state, action) => {
      const caseIndex = state.value.findIndex(
        (file) => file.caseId === action.payload.caseId
      );
      if (caseIndex >= 0) {
        state.value[caseIndex].files = [
          ...state.value[caseIndex].files,
          ...action.payload.files,
        ];
      }
    },
  },
});

export const { addFiles, addMoreFiles } = filesSlice.actions;

export const selectFilesById = (id) => (state) =>
  state.files.value.find((file) => file.caseId === id);

// export const selectCleanedFilesById = (id) => (state) => {
//   const files = state.files.value.find((file) => file.caseId === id)?.files;
//   const cleanedFiles = files?.filter((file) => file.cleaningStatus === 100);
//   return cleanedFiles;
// };

export const selectFilterCleanedFilesById = (state, id) => {
  const files = state.find((file) => file.caseId === id)?.files;
  const cleanedFiles = files?.filter((file) => file.cleaningStatus === 100);
  return cleanedFiles;
};

export const selectFilteredCleanedFilesById = createSelector(
  (state) => state.files.value,
  (state, id) => id,
  (state, id) => selectFilterCleanedFilesById(state, id)
);

export default filesSlice.reducer;
