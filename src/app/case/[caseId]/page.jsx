"use client";

import { Box, Grid } from "@mui/material";
import { EnhancedTable } from "@/components/Table/Table";
import { CaseHeader } from "@/components/Case/CaseHeader";
import { CaseSettings } from "@/components/Case/CaseSettings";
import { CaseSuggestedPrompts } from "@/components/Case/CaseSuggestedPrompts";
import { useParams } from "next/navigation";
import { selectFilesByCaseId } from "@/redux/features/cases/filesSlice";
import { useSelector } from "react-redux";

const CasePage = () => {
  const params = useParams();
  const { caseId } = params;
  const files = useSelector(selectFilesByCaseId(caseId));

  return (
    <Box p={2} sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <CaseHeader caseDetails={files} />
          <EnhancedTable title="Case Files" data={files?.files} />
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
