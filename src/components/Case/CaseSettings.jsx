import { Box } from "@mui/material";
import { InfoCard } from "../InfoCard";
import { ModelSelection } from "../ModelSelection";
import { DataSecurityPolicies } from "../DataSecurityPolicies";

const CaseSettings = () => {
  return (
    <InfoCard title="Case Settings">
      <Box mb={3}>
        <ModelSelection />
      </Box>
      <DataSecurityPolicies />
    </InfoCard>
  );
};

export { CaseSettings };
