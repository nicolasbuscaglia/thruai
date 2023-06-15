import { Box, Typography, useTheme } from "@mui/material";

const ChatDetails = () => {
  const theme = useTheme();
  return (
    <Box>
      <Typography variant="body1" color="secondary">
        Case: Patient ID #34512
      </Typography>
      <Typography variant="body2" color={theme.palette.gray.main}>
        Model · OpenAi ChatGPT v3.5
      </Typography>
    </Box>
  );
};

export { ChatDetails };
