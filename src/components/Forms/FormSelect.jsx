import {
  Box,
  MenuItem,
  Typography,
  Select,
  styled,
  useTheme,
} from "@mui/material";
import { useState } from "react";

const FORM_TITLE = "MODEL SELECTION";

const FORM_SELECT_ITEMS = [
  {
    id: 1,
    label: "OpenAI ChatGPT 3.5 (Default)",
  },
  { id: 2, label: "OpenAI ChatGPT 4" },
];

const StyledSelect = styled(Select)(({ theme }) => ({
  color: theme.palette.icon.main,
  fontSize: "0.8rem",
  fontWeight: 300,
  "& svg": {
    color: theme.palette.icon.main,
  },
  "&::before, ::after": {
    borderColor: theme.palette.icon.main,
  },
}));

const FormSelect = ({ title = FORM_TITLE, items = FORM_SELECT_ITEMS }) => {
  const theme = useTheme();
  const [model, setModel] = useState("OpenAI ChatGPT 3.5 (Default)");

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  return (
    <Box p={2} display="flex" flexDirection="column">
      <Typography variant="overline" color="secondary">
        {title}
      </Typography>
      <StyledSelect
        labelId="select-model"
        id="select-model"
        value={model}
        onChange={handleModelChange}
        label="Model"
        variant="filled"
        MenuProps={{
          PaperProps: {
            sx: {
              bgcolor: theme.palette.secondary.main,
              color: theme.palette.primary.main,
            },
          },
        }}
      >
        {items.map((item) => {
          return (
            <MenuItem
              key={item.id}
              value={item.label}
              sx={{ fontSize: "0.8rem" }}
            >
              {item.label}
            </MenuItem>
          );
        })}
      </StyledSelect>
    </Box>
  );
};

export { FormSelect };
