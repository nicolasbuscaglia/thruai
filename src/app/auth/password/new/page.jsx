"use client";
import { AuthForm } from "@/components/Auth/AuthForm";
import { LoginLink } from "@/components/Auth/LoginLink";
import { StyledAuthFormBottomBox } from "@/components/StyledComponents/StyledAuthFormBottomBox";
import useAuth from "@/hooks/useAuth";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const formFields = [
  {
    id: 1,
    name: "code",
    label: "Reset code",
    type: "number",
  },
  {
    id: 2,
    name: "password",
    label: "New password",
    type: "password",
    autoComplete: "on",
  },
];

const submitButtonLabel = "Submit";

const NewPassword = () => {
  const searchParams = useSearchParams();

  const { resetPassword } = useAuth();

  const onSubmitForm = (data) => {
    const payload = {
      username,
      ...data,
    };
    resetPassword(payload);
  };

  const username = searchParams.get("username");

  return (
    <Box p={2}>
      <AuthForm
        title="New password for your account"
        formFields={formFields}
        submitButtonLabel={submitButtonLabel}
        onSubmitForm={onSubmitForm}
        bottomComponent={
          <StyledAuthFormBottomBox>
            <LoginLink />
          </StyledAuthFormBottomBox>
        }
      />
    </Box>
  );
};

export default NewPassword;
