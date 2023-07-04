import { Button, styled } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useSelector } from "react-redux";
import { selectIsAuthSubmitting } from "@/redux/features/uiSlice";

const StyledGoogleButton = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
  backgroundColor: theme.palette.border.main,
  borderRadius: "0.5rem",
}));

const GoogleButton = ({ handleClick }) => {
  const isSubmitting = useSelector((state) => selectIsAuthSubmitting(state));
  return (
    <StyledGoogleButton
      onClick={handleClick}
      startIcon={<GoogleIcon />}
      fullWidth
      disabled={isSubmitting}
    >
      Continue with Google
    </StyledGoogleButton>
  );
};

export { GoogleButton };
