import {
  Box,
  MenuItem,
  Typography,
  Select,
  styled,
  useTheme,
} from "@mui/material";
import { useState } from "react";

const StyledSelect = styled(Select)(({ theme }) => ({
  color: theme.palette.icon.main,
  fontSize: "0.8rem",
  fontWeight: 300,
  borderRadius: "0.6rem",
  borderColor: theme.palette.border.main,
  "& svg": {
    color: theme.palette.icon.main,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: `${theme.palette.border.main} !important`,
  },
  "& .MuiSelect-select": {
    paddingTop: 8,
    paddingBottom: 8,
  },
}));

const FormSelect = ({ title, items = [], handleSelectedChange = () => {} }) => {
  const theme = useTheme();
  const [selected, setSelected] = useState(items[0].label);

  const handleChange = (event) => {
    setSelected(event.target.value);
    handleSelectedChange(event.target.value);
  };

  return (
    <Box display="flex" flexDirection="column">
      {title && (
        <Typography variant="overline" color="secondary">
          {title}
        </Typography>
      )}
      <StyledSelect
        labelId="select-option"
        id="select-option"
        value={selected}
        onChange={handleChange}
        variant="outlined"
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
              sx={{
                fontSize: "0.8rem",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box display="flex" gap={1} alignItems="center">
                {item.icon}
                <Typography color="icon" variant="body2">
                  {item.label}
                </Typography>
              </Box>
            </MenuItem>
          );
        })}
      </StyledSelect>
    </Box>
  );
};

export { FormSelect };
