import { Box, Typography, useTheme } from "@mui/material";
import { useParams } from "next/navigation";

const ChatDetails = () => {
  const theme = useTheme();
  const params = useParams();
  const { caseId, chatId } = params;
  return (
    <Box>
      <Typography variant="body1" color="secondary">
        Case ID #{caseId}
      </Typography>
      <Typography variant="body1" color="secondary">
        Chat ID #{chatId}
      </Typography>
      <Typography variant="body2" color={theme.palette.gray.main}>
        Model · OpenAi ChatGPT v3.5
      </Typography>
    </Box>
  );
};

export { ChatDetails };
