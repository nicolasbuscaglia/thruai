import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
    {
      caseId: "1",
      lastUpdated: "12 April at 09:28 PM",
      files: [
        {
          id: 1,
          fileName: "PatientRecords_June2023.csv",
          type: ".csv",
          size: "146.5 Kb",
          cleaningStatus: 100,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 2,
          fileName: "ClinicalTrialData_Q3_2023.xlsx",
          type: ".xlsx",
          size: "50.3 Mb",
          cleaningStatus: 100,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 3,
          fileName: "InsuranceClaims_2023_Q2.json",
          type: ".json",
          size: "32.6 Kb",
          cleaningStatus: 100,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 4,
          fileName: "PrescriptionData_May2023.csv",
          type: ".csv",
          size: "146.5 Kb",
          cleaningStatus: 75,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 5,
          fileName: "HospitalAdmissions_2023Q1.xlsx",
          type: ".xlsx",
          size: "146.5 Kb",
          cleaningStatus: 80,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 6,
          fileName: "EmergencyRoom_Visits_Jan2023.csv",
          type: ".csv",
          size: "146.5 Kb",
          cleaningStatus: 60,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 7,
          fileName: "SurgicalProcedures_2023.json",
          type: ".json",
          size: "146.5 Kb",
          cleaningStatus: 53,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 8,
          fileName: "PatientRecords_June2023.csv",
          type: ".csv",
          size: "146.5 Kb",
          cleaningStatus: 20,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 9,
          fileName: "ImmunizationRecords_2023.csv",
          type: ".csv",
          size: "146.5 Kb",
          cleaningStatus: 98,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 10,
          fileName: "LabResults_Feb2023.xlsx",
          type: ".xlsx",
          size: "146.5 Kb",
          cleaningStatus: 70,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 11,
          fileName: "MentalHealthStats_2023Q2.json",
          type: ".json",
          size: "146.5 Kb",
          cleaningStatus: 100,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 12,
          fileName: "MentalHealthStats_2023Q3.json",
          type: ".json",
          size: "146.5 Kb",
          cleaningStatus: 40,
          uploadedOn: "Jun 21, 2019",
        },
      ],
    },
    {
      caseId: "2",
      lastUpdated: "12 April at 09:28 PM",
      files: [
        {
          id: 1,
          fileName: "PatientRecords_June2023.csv",
          type: ".csv",
          size: "146.5 Kb",
          cleaningStatus: 100,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 2,
          fileName: "ClinicalTrialData_Q3_2023.xlsx",
          type: ".xlsx",
          size: "50.3 Mb",
          cleaningStatus: 90,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 3,
          fileName: "InsuranceClaims_2023_Q2.json",
          type: ".json",
          size: "32.6 Kb",
          cleaningStatus: 100,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 4,
          fileName: "PrescriptionData_May2023.csv",
          type: ".csv",
          size: "146.5 Kb",
          cleaningStatus: 75,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 5,
          fileName: "HospitalAdmissions_2023Q1.xlsx",
          type: ".xlsx",
          size: "146.5 Kb",
          cleaningStatus: 80,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 6,
          fileName: "EmergencyRoom_Visits_Jan2023.csv",
          type: ".csv",
          size: "146.5 Kb",
          cleaningStatus: 60,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 7,
          fileName: "SurgicalProcedures_2023.json",
          type: ".json",
          size: "146.5 Kb",
          cleaningStatus: 53,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 8,
          fileName: "PatientRecords_June2023.csv",
          type: ".csv",
          size: "146.5 Kb",
          cleaningStatus: 20,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 9,
          fileName: "ImmunizationRecords_2023.csv",
          type: ".csv",
          size: "146.5 Kb",
          cleaningStatus: 98,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 10,
          fileName: "LabResults_Feb2023.xlsx",
          type: ".xlsx",
          size: "146.5 Kb",
          cleaningStatus: 70,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 11,
          fileName: "MentalHealthStats_2023Q2.json",
          type: ".json",
          size: "146.5 Kb",
          cleaningStatus: 100,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 12,
          fileName: "MentalHealthStats_2023Q3.json",
          type: ".json",
          size: "146.5 Kb",
          cleaningStatus: 40,
          uploadedOn: "Jun 21, 2019",
        },
      ],
    },
    {
      caseId: "3",
      lastUpdated: "12 April at 09:28 PM",
      files: [
        {
          id: 1,
          fileName: "PatientRecords_June2023.csv",
          type: ".csv",
          size: "146.5 Kb",
          cleaningStatus: 100,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 2,
          fileName: "ClinicalTrialData_Q3_2023.xlsx",
          type: ".xlsx",
          size: "50.3 Mb",
          cleaningStatus: 100,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 3,
          fileName: "InsuranceClaims_2023_Q2.json",
          type: ".json",
          size: "32.6 Kb",
          cleaningStatus: 100,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 4,
          fileName: "PrescriptionData_May2023.csv",
          type: ".csv",
          size: "146.5 Kb",
          cleaningStatus: 75,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 5,
          fileName: "HospitalAdmissions_2023Q1.xlsx",
          type: ".xlsx",
          size: "146.5 Kb",
          cleaningStatus: 80,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 6,
          fileName: "EmergencyRoom_Visits_Jan2023.csv",
          type: ".csv",
          size: "146.5 Kb",
          cleaningStatus: 60,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 7,
          fileName: "SurgicalProcedures_2023.json",
          type: ".json",
          size: "146.5 Kb",
          cleaningStatus: 53,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 8,
          fileName: "PatientRecords_June2023.csv",
          type: ".csv",
          size: "146.5 Kb",
          cleaningStatus: 20,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 9,
          fileName: "ImmunizationRecords_2023.csv",
          type: ".csv",
          size: "146.5 Kb",
          cleaningStatus: 98,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 10,
          fileName: "LabResults_Feb2023.xlsx",
          type: ".xlsx",
          size: "146.5 Kb",
          cleaningStatus: 70,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 11,
          fileName: "MentalHealthStats_2023Q2.json",
          type: ".json",
          size: "146.5 Kb",
          cleaningStatus: 100,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 12,
          fileName: "MentalHealthStats_2023Q3.json",
          type: ".json",
          size: "146.5 Kb",
          cleaningStatus: 40,
          uploadedOn: "Jun 21, 2019",
        },
      ],
    },
    {
      caseId: "4",
      lastUpdated: "12 April at 09:28 PM",
      files: [
        {
          id: 1,
          fileName: "PatientRecords_June2023.csv",
          type: ".csv",
          size: "146.5 Kb",
          cleaningStatus: 100,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 2,
          fileName: "ClinicalTrialData_Q3_2023.xlsx",
          type: ".xlsx",
          size: "50.3 Mb",
          cleaningStatus: 100,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 3,
          fileName: "InsuranceClaims_2023_Q2.json",
          type: ".json",
          size: "32.6 Kb",
          cleaningStatus: 100,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 4,
          fileName: "PrescriptionData_May2023.csv",
          type: ".csv",
          size: "146.5 Kb",
          cleaningStatus: 75,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 5,
          fileName: "HospitalAdmissions_2023Q1.xlsx",
          type: ".xlsx",
          size: "146.5 Kb",
          cleaningStatus: 80,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 6,
          fileName: "EmergencyRoom_Visits_Jan2023.csv",
          type: ".csv",
          size: "146.5 Kb",
          cleaningStatus: 60,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 7,
          fileName: "SurgicalProcedures_2023.json",
          type: ".json",
          size: "146.5 Kb",
          cleaningStatus: 53,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 8,
          fileName: "PatientRecords_June2023.csv",
          type: ".csv",
          size: "146.5 Kb",
          cleaningStatus: 20,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 9,
          fileName: "ImmunizationRecords_2023.csv",
          type: ".csv",
          size: "146.5 Kb",
          cleaningStatus: 98,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 10,
          fileName: "LabResults_Feb2023.xlsx",
          type: ".xlsx",
          size: "146.5 Kb",
          cleaningStatus: 70,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 11,
          fileName: "MentalHealthStats_2023Q2.json",
          type: ".json",
          size: "146.5 Kb",
          cleaningStatus: 100,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 12,
          fileName: "MentalHealthStats_2023Q3.json",
          type: ".json",
          size: "146.5 Kb",
          cleaningStatus: 40,
          uploadedOn: "Jun 21, 2019",
        },
      ],
    },
    {
      caseId: "5",
      lastUpdated: "12 April at 09:28 PM",
      files: [
        {
          id: 1,
          fileName: "PatientRecords_June2023.csv",
          type: ".csv",
          size: "146.5 Kb",
          cleaningStatus: 100,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 2,
          fileName: "ClinicalTrialData_Q3_2023.xlsx",
          type: ".xlsx",
          size: "50.3 Mb",
          cleaningStatus: 100,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 3,
          fileName: "InsuranceClaims_2023_Q2.json",
          type: ".json",
          size: "32.6 Kb",
          cleaningStatus: 100,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 4,
          fileName: "PrescriptionData_May2023.csv",
          type: ".csv",
          size: "146.5 Kb",
          cleaningStatus: 75,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 5,
          fileName: "HospitalAdmissions_2023Q1.xlsx",
          type: ".xlsx",
          size: "146.5 Kb",
          cleaningStatus: 80,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 6,
          fileName: "EmergencyRoom_Visits_Jan2023.csv",
          type: ".csv",
          size: "146.5 Kb",
          cleaningStatus: 60,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 7,
          fileName: "SurgicalProcedures_2023.json",
          type: ".json",
          size: "146.5 Kb",
          cleaningStatus: 53,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 8,
          fileName: "PatientRecords_June2023.csv",
          type: ".csv",
          size: "146.5 Kb",
          cleaningStatus: 20,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 9,
          fileName: "ImmunizationRecords_2023.csv",
          type: ".csv",
          size: "146.5 Kb",
          cleaningStatus: 98,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 10,
          fileName: "LabResults_Feb2023.xlsx",
          type: ".xlsx",
          size: "146.5 Kb",
          cleaningStatus: 70,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 11,
          fileName: "MentalHealthStats_2023Q2.json",
          type: ".json",
          size: "146.5 Kb",
          cleaningStatus: 100,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 12,
          fileName: "MentalHealthStats_2023Q3.json",
          type: ".json",
          size: "146.5 Kb",
          cleaningStatus: 40,
          uploadedOn: "Jun 21, 2019",
        },
      ],
    },
    {
      caseId: "6",
      lastUpdated: "12 April at 09:28 PM",
      files: [
        {
          id: 1,
          fileName: "PatientRecords_June2023.csv",
          type: ".csv",
          size: "146.5 Kb",
          cleaningStatus: 100,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 2,
          fileName: "ClinicalTrialData_Q3_2023.xlsx",
          type: ".xlsx",
          size: "50.3 Mb",
          cleaningStatus: 100,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 3,
          fileName: "InsuranceClaims_2023_Q2.json",
          type: ".json",
          size: "32.6 Kb",
          cleaningStatus: 100,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 4,
          fileName: "PrescriptionData_May2023.csv",
          type: ".csv",
          size: "146.5 Kb",
          cleaningStatus: 75,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 5,
          fileName: "HospitalAdmissions_2023Q1.xlsx",
          type: ".xlsx",
          size: "146.5 Kb",
          cleaningStatus: 80,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 6,
          fileName: "EmergencyRoom_Visits_Jan2023.csv",
          type: ".csv",
          size: "146.5 Kb",
          cleaningStatus: 60,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 7,
          fileName: "SurgicalProcedures_2023.json",
          type: ".json",
          size: "146.5 Kb",
          cleaningStatus: 53,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 8,
          fileName: "PatientRecords_June2023.csv",
          type: ".csv",
          size: "146.5 Kb",
          cleaningStatus: 20,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 9,
          fileName: "ImmunizationRecords_2023.csv",
          type: ".csv",
          size: "146.5 Kb",
          cleaningStatus: 98,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 10,
          fileName: "LabResults_Feb2023.xlsx",
          type: ".xlsx",
          size: "146.5 Kb",
          cleaningStatus: 70,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 11,
          fileName: "MentalHealthStats_2023Q2.json",
          type: ".json",
          size: "146.5 Kb",
          cleaningStatus: 100,
          uploadedOn: "Jun 21, 2019",
        },
        {
          id: 12,
          fileName: "MentalHealthStats_2023Q3.json",
          type: ".json",
          size: "146.5 Kb",
          cleaningStatus: 40,
          uploadedOn: "Jun 21, 2019",
        },
      ],
    },
  ],
};

export const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {},
});

// export const { addNote } = notesSlice.actions;

export const selectFilesById = (id) => (state) =>
  state.files.value.find((file) => file.caseId === id);

export const selectCleanedFilesById = (id) => (state) => {
  const files = state.files.value.find((file) => file.caseId === id)?.files;
  const cleanedFiles = files?.filter((file) => file.cleaningStatus === 100);
  return cleanedFiles;
};

export default filesSlice.reducer;