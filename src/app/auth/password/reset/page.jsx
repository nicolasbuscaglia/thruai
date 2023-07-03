"use client";
import { AuthForm } from "@/components/Auth/AuthForm";
import { LoginLink } from "@/components/Auth/LoginLink";
import useAuth from "@/hooks/useAuth";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

const formFields = [
  {
    id: 1,
    name: "username",
    label: "Username",
    type: "text",
  },
];

const submitButtonLabel = "Request code";

const ResetPassword = () => {
  const { resetPasswordRequest } = useAuth();

  const onSubmitForm = (data, { ...params }) => {
    resetPasswordRequest(data, { ...params });
  };

  return (
    <Box p={2}>
      <AuthForm
        title="Request password reset for your account"
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

export default ResetPassword;
