import { IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const PasswordVisibility = ({ handleClick, showPassword }) => {
  return (
    <InputAdornment position="end">
      <IconButton aria-label="toggle password visibility" onClick={handleClick}>
        {showPassword ? (
          <VisibilityIcon color="gray" fontSize="small" />
        ) : (
          <VisibilityOffIcon color="gray" fontSize="small" />
        )}
      </IconButton>
    </InputAdornment>
  );
};

export { PasswordVisibility };
