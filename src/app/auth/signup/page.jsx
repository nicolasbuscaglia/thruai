"use client";
import { AuthForm } from "@/components/Auth/AuthForm";
import { LoginLink } from "@/components/Auth/LoginLink";
import useRegister from "@/hooks/useRegister";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

const formFields = [
  {
    id: 1,
    name: "username",
    label: "Username",
    type: "text",
  },
  {
    id: 2,
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    id: 3,
    name: "password",
    label: "Password",
    type: "password",
    autoComplete: "on",
  },
];

const submitButtonLabel = "Sign up";

const SignUp = () => {
  const { register } = useRegister();

  const onSubmitForm = (data, { ...params }) => {
    register(data, { ...params });
  };

  return (
    <Box p={2}>
      <AuthForm
        title="Sign up to your account"
        formFields={formFields}
        submitButtonLabel={submitButtonLabel}
        onSubmitForm={onSubmitForm}
      >
        <Box mb={2}>
          <LoginLink />
        </Box>
      </AuthForm>
    </Box>
  );
};

export default SignUp;
