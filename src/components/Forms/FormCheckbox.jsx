import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

const FormCheckbox = ({ title = "", checkboxes = [] }) => {
  const theme = useTheme();
  const [state, setState] = useState(checkboxes);

  const handleChange = (event) => {
    const newState = [...state];
    const newObject = newState.find((item) => item.id === event.target.name);
    newObject.checked = event.target.checked;
    setState([...newState]);
  };

  return (
    <Box>
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
