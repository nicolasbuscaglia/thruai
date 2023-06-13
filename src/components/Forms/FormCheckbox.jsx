import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

const FORM_TITLE = "DATA SECURITY POLICIES";
const FORM_CHECKBOXES = [
  { id: "hipaa", label: "HIPAA (Default)", checked: false },
  { id: "data-retention-30", label: "Data Retention 30 Days", checked: false },
];

const FormCheckbox = ({ title = FORM_TITLE, checkboxes = FORM_CHECKBOXES }) => {
  const theme = useTheme();
  const [state, setState] = useState(checkboxes);

  const handleChange = (event) => {
    const newState = [...state];
    const newObject = newState.find((item) => item.id === event.target.name);
    newObject.checked = event.target.checked;
    setState([...newState]);
  };

  return (
    <Box p={2}>
      <Typography variant="overline" color="secondary">
        {title}
      </Typography>
      <Box display="flex" flexDirection="column">
        {state.map((checkbox) => {
          return (
            <FormControlLabel
              key={checkbox.id}
              control={
                <Checkbox
                  name={checkbox.id}
                  checked={checkbox.checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                  color="blue"
                  size="small"
                  sx={{ color: theme.palette.gray.light }}
                />
              }
              label={
                <Typography
                  variant="body2"
                  color={theme.palette.gray.light}
                  fontWeight={300}
                >
                  {checkbox.label}
                </Typography>
              }
            />
          );
        })}
      </Box>
    </Box>
  );
};

export { FormCheckbox };
