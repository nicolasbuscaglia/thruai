import { selectIsDisabledForm } from "@/redux/features/uiSlice";
import { Box, TextField, Typography, styled, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& fieldset": {
    borderRadius: "1rem",
    border: "none",
  },
  "& .Mui-disabled": {
    WebkitTextFillColor: `${theme.palette.gray.main} !important`,
  },
  "& :before, & :after": {
    borderColor: `${theme.palette.border.main} !important`,
  },
}));

const FormInputText = ({
  label = "",
  variant = "standard",
  placeholder = "",
  value = "",
  onChange = () => {},
  onKeyDown = () => {},
  ref,
}) => {
  const theme = useTheme();
  const disabled = useSelector((state) => selectIsDisabledForm(state));

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode == 13) {
      onKeyDown();
    }
  };

  return (
    <Box display="flex" flexDirection="column">
      {label && (
        <Typography variant="overline" color="secondary">
          {label}
        </Typography>
      )}
      <StyledTextField
        id="text-input"
        variant={variant}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        inputProps={{
          sx: { fontSize: "0.875rem", color: theme.palette.gray.light },
        }}
        onKeyDown={handleKeyDown}
        inputRef={ref}
        disabled={disabled}
      />
    </Box>
  );
};

export { FormInputText };
