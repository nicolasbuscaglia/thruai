import {
  Box,
  MenuItem,
  Typography,
  Select,
  styled,
  useTheme,
} from "@mui/material";
import { useState } from "react";

const StyledSelect = styled(Select, {
  shouldForwardProp: (prop) => prop !== "background",
  shouldForwardProp: (prop) => prop !== "padding",
})(({ theme, background, padding }) => ({
  color:
    background === "dark"
      ? theme.palette.lightGray.main
      : theme.palette.icon.main,
  backgroundColor:
    background === "dark"
      ? theme.palette.border.main
      : theme.palette.primary.main,
  fontSize: "0.8rem",
  fontWeight: 300,
  borderRadius: "0.8rem",
  borderColor: theme.palette.border.main,
  "& svg": {
    color: theme.palette.icon.main,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: `${theme.palette.border.main} !important`,
  },
  "& .MuiSelect-select": {
    paddingTop: padding,
    paddingBottom: padding,
  },
}));

const FormSelect = ({
  background = "light",
  padding = "16.5px 14px",
  label,
  items = [],
  handleSelectedChange = () => {},
}) => {
  const theme = useTheme();
  const [selected, setSelected] = useState(items[0].label);

  const handleChange = (event) => {
    setSelected(event.target.value);
    handleSelectedChange(event.target.value);
  };

  return (
    <Box display="flex" flexDirection="column">
      {label && (
        <Typography variant="overline" color="secondary">
          {label}
        </Typography>
      )}
      <StyledSelect
        labelId="select-option"
        id="select-option"
        value={selected}
        onChange={handleChange}
        variant="outlined"
        background={background}
        padding={padding}
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
