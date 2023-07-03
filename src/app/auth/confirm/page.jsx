"use client";
import { AuthForm } from "@/components/Auth/AuthForm";
import { LoginLink } from "@/components/Auth/LoginLink";
import useRegister from "@/hooks/useRegister";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const formFields = [
  {
    id: 1,
    name: "code",
    label: "Confirmation code",
    type: "number",
  },
];

const submitButtonLabel = "Confirm";

const ConfirmForm = () => {
  const searchParams = useSearchParams();

  const { confirm } = useRegister();

  const onSubmitForm = (data, { ...params }) => {
    const payload = {
      username: username,
      code: data.code,
    };
    confirm(payload, { ...params });
  };

  const username = searchParams.get("username");

  return (
    <Box p={2}>
      <AuthForm
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

export default ConfirmForm;
