import { Typography } from "@mui/material";
import Link from "next/link";

const LoginLink = () => {
  return (
    <Link href="/auth/login">
      <Typography fontSize={12} color="secondary" textAlign="center">
        Already have an account? Log in
      </Typography>
    </Link>
  );
};

export { LoginLink };
