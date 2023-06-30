"use client";
import { Controller, useForm } from "react-hook-form";
import { Box, Button, TextField, styled, useTheme } from "@mui/material";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { SubmitButton } from "../SubmitButton";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& fieldset": {
    borderRadius: "1rem",

    borderColor: `${theme.palette.border.main} !important`,
  },
  "& :before, & :after": {
    borderColor: `${theme.palette.border.main} !important`,
  },
  "& .MuiInputLabel-outlined": {
    color: `${theme.palette.gray.main} !important`,
  },
}));

const ResetPasswordForm = () => {
  const theme = useTheme();
  const [submitting, setSubmitting] = useState(false);
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const { resetPasswordRequest } = useAuth();

  const onSubmit = handleSubmit((data) => {
    setSubmitting(true);
    resetPasswordRequest(data, { setSubmitting });
  });

  return (
    <Box p={2}>
      <form onSubmit={onSubmit}>
        <Box mb={2}>
          <Controller
            name="username"
            control={control}
            rules={{ required: "Username is required." }}
            render={({ field }) => (
              <StyledTextField
                id="input-username"
                label="Username"
                variant="outlined"
                {...field}
                inputProps={{
                  sx: { color: theme.palette.gray.light },
                }}
                fullWidth
              />
            )}
          />
        </Box>
        <Box textAlign="center">
          <SubmitButton label="Request code" disabled={submitting} />
        </Box>
      </form>
    </Box>
  );
};

export { ResetPasswordForm };
