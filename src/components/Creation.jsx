import { useTheme } from "@emotion/react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { FormCheckbox } from "./Forms/FormCheckbox";
import { FormFileUpload } from "./Forms/FormFileUpload";
import { FormInputText } from "./Forms/FormInputText";
import { ModelSelection } from "./ModelSelection";
import { DataSecurityPolicies } from "./DataSecurityPolicies";

const Creation = ({ handleCancel, handleCreate }) => {
  const theme = useTheme();

  return (
    <Box>
      <Box p={2}>
        <Typography variant="body1" color="secondary">
          Case Creation
        </Typography>
      </Box>
      <Divider sx={{ backgroundColor: theme.palette.border.main }} />
      <Box p={2}>
        <FormFileUpload />
      </Box>
      <Divider sx={{ backgroundColor: theme.palette.border.main }} />
      <Box p={2}>
        <FormInputText label="CASE NAME" />
      </Box>
      <Divider sx={{ backgroundColor: theme.palette.border.main }} />
      <Box p={2}>
        <ModelSelection />
      </Box>
      <Divider sx={{ backgroundColor: theme.palette.border.main }} />
      <Box p={2}>
        <DataSecurityPolicies />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Button
          color="blue"
          variant="text"
          sx={{ borderRadius: "0.6rem", color: theme.palette.blue.main }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          color="blue"
          variant="contained"
          sx={{ borderRadius: "0.6rem", color: theme.palette.secondary.main }}
          onClick={handleCreate}
        >
          Create Case
        </Button>
      </Box>
    </Box>
  );
};

export { Creation };
