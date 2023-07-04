import { Box } from "@mui/system";
import { StyledAuthFormBottomBox } from "../StyledComponents/StyledAuthFormBottomBox";
import { Typography } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectIsAuthSubmitting } from "@/redux/features/uiSlice";

const SignUpLink = () => {
  const isSubmitting = useSelector((state) => selectIsAuthSubmitting(state));
  return (
    <StyledAuthFormBottomBox>
      <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
        <Link href={isSubmitting ? "" : "/auth/password/reset"}>
          <Typography fontSize={12} color="secondary" textAlign="center">
            {"Can't login?"}
          </Typography>
        </Link>
        <Typography variant="subtitle2" color="secondary">
          ·
        </Typography>
        <Link href={isSubmitting ? "" : "/auth/signup"}>
          <Typography fontSize={12} color="secondary" textAlign="center">
            {"Sign up for new user?"}
          </Typography>
        </Link>
      </Box>
    </StyledAuthFormBottomBox>
  );
};

export { SignUpLink };
