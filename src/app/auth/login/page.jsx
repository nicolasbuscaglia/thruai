"use client";
import { AuthForm } from "@/components/Auth/AuthForm";
import useAuth from "@/hooks/useAuth";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const formFields = [
  {
    id: 1,
    name: "username",
    label: "Username",
    type: "text",
  },
  {
    id: 2,
    name: "password",
    label: "Password",
    type: "password",
    autoComplete: "on",
  },
];

const submitButtonLabel = "Log in";

const LogIn = () => {
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const confirmed = searchParams.get("confirmed");

  const onSubmitForm = (data, { ...params }) => {
    login(data, { ...params });
  };

  return (
    <Box p={2}>
      {confirmed === "true" && (
        <Box mb={2}>
          <Typography color="secondary">{"You're signed up!"}</Typography>
        </Box>
      )}
      <AuthForm
        title="Login to your account"
        formFields={formFields}
        submitButtonLabel={submitButtonLabel}
        onSubmitForm={onSubmitForm}
      >
        <Box mb={2}>
          <Link href="/auth/signup">
            <Typography fontSize={12} color="secondary" textAlign="center">
              {"Don't have an account? Sign up!"}
            </Typography>
          </Link>
        </Box>
        <Box mb={2}>
          <Link href="/auth/password/reset">
            <Typography fontSize={12} color="secondary" textAlign="center">
              Forgot password?
            </Typography>
          </Link>
        </Box>
      </AuthForm>
    </Box>
  );
};

export default LogIn;
