import { Box, Typography } from "@mui/material";

const FormErrorMessage = ({ message }) => {
  return (
    <Box mt={1}>
      <Typography variant="body2" color="error">
        {message}
      </Typography>
    </Box>
  );
};

export { FormErrorMessage };
