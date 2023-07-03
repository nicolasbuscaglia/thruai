import { styled, TextField } from "@mui/material";

const StyledTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.lightGray.dark,
  borderRadius: "1rem",
  "& .Mui-disabled": {
    color: `${theme.palette.gray.main} !important`,
    WebkitTextFillColor: `${theme.palette.gray.main} !important`,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "1rem",
    borderColor: `${theme.palette.border.main} !important`,
  },
  "& :before, & :after": {
    borderColor: `${theme.palette.border.main} !important`,
  },
  "& .MuiInputLabel-outlined": {
    color: `${theme.palette.gray.main} !important`,
  },
}));

export { StyledTextField };
