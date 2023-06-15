import { useTheme } from "@emotion/react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { FormSelect } from "./Forms/FormSelect";
import { FormCheckbox } from "./Forms/FormCheckbox";
import { FormFileUpload } from "./Forms/FormFileUpload";
import { FormInputText } from "./Forms/FormInputText";

const FORM_SELECT_ITEMS = [
  {
    id: 1,
    label: "OpenAI ChatGPT 3.5 (Default)",
  },
  { id: 2, label: "OpenAI ChatGPT 4" },
];

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
        <FormSelect label="MODEL SELECTION" items={FORM_SELECT_ITEMS} />
      </Box>
      <Divider sx={{ backgroundColor: theme.palette.border.main }} />
      <FormCheckbox />

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
