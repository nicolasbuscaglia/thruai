import { selectIsAuthSubmitting } from "@/redux/features/uiSlice";
import { Typography } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";

const LoginLink = () => {
  const isSubmitting = useSelector((state) => selectIsAuthSubmitting(state));
  return (
    <Link href={isSubmitting ? "#" : "/auth/login"}>
      <Typography fontSize={12} color="secondary" textAlign="center">
        Already have a ThruAi account? Log in
      </Typography>
    </Link>
  );
};

export { LoginLink };
