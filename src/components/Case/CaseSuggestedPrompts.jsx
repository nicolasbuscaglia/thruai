import { Box, Typography } from "@mui/material";
import { InfoCard } from "../InfoCard";

const CaseSuggestedPrompts = () => {
  return (
    <InfoCard title="Suggested Prompts">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="10rem"
      >
        <Typography variant="overline" color="secondary">
          Coming soon
        </Typography>
      </Box>
    </InfoCard>
  );
};

export { CaseSuggestedPrompts };
