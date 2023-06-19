"use client";

import { Box, Grid, Typography } from "@mui/material";
import { EnhancedTable } from "@/components/Table/Table";
import { useEffect, useState } from "react";
import { CaseHeader } from "@/components/Case/CaseHeader";
import { CaseSettings } from "@/components/Case/CaseSettings";
import { CaseSuggestedPrompts } from "@/components/Case/CaseSuggestedPrompts";

const CASE = {
  id: 32042,
  lastUpdated: "12 April at 09:28 PM",
  files: [
    {
      id: 1,
      fileName: "PatientRecords_June2023.csv",
      cleaningStatus: 100,
      uploadedOn: "Jun 21, 2019",
    },
    {
      id: 2,
      fileName: "ClinicalTrialData_Q3_2023.xlsx",
      cleaningStatus: 35,
      uploadedOn: "Jun 21, 2019",
    },
    {
      id: 3,
      fileName: "InsuranceClaims_2023_Q2.json",
      cleaningStatus: 75,
      uploadedOn: "Jun 21, 2019",
    },
    {
      id: 4,
      fileName: "PrescriptionData_May2023.csv",
      cleaningStatus: 75,
      uploadedOn: "Jun 21, 2019",
    },
    {
      id: 5,
      fileName: "HospitalAdmissions_2023Q1.xlsx",
      cleaningStatus: 80,
      uploadedOn: "Jun 21, 2019",
    },
    {
      id: 6,
      fileName: "EmergencyRoom_Visits_Jan2023.csv",
      cleaningStatus: 60,
      uploadedOn: "Jun 21, 2019",
    },
    {
      id: 7,
      fileName: "SurgicalProcedures_2023.json",
      cleaningStatus: 53,
      uploadedOn: "Jun 21, 2019",
    },
    {
      id: 8,
      fileName: "PatientRecords_June2023.csv",
      cleaningStatus: 20,
      uploadedOn: "Jun 21, 2019",
    },
    {
      id: 9,
      fileName: "ImmunizationRecords_2023.csv",
      cleaningStatus: 98,
      uploadedOn: "Jun 21, 2019",
    },
    {
      id: 10,
      fileName: "LabResults_Feb2023.xlsx",
      cleaningStatus: 70,
      uploadedOn: "Jun 21, 2019",
    },
    {
      id: 11,
      fileName: "MentalHealthStats_2023Q2.json",
      cleaningStatus: 100,
      uploadedOn: "Jun 21, 2019",
    },
    {
      id: 12,
      fileName: "MentalHealthStats_2023Q3.json",
      cleaningStatus: 40,
      uploadedOn: "Jun 21, 2019",
    },
  ],
};

const CasePage = () => {
  const [caseDetails, setCaseDetails] = useState({});

  useEffect(() => {
    setCaseDetails(CASE);
  }, []);

  return (
    <Box p={2} sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <CaseHeader caseDetails={caseDetails} />
          <EnhancedTable title="Case Files" data={caseDetails.files} />
        </Grid>
        <Grid item xs={12} md={3}>
          <Box mb={3}>
            <CaseSettings />
          </Box>
          <Box mb={3}>
            <CaseSuggestedPrompts />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CasePage;
