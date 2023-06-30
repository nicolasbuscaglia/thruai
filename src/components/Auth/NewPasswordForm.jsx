"use client";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useSearchParams } from "next/navigation";
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

const NewPasswordForm = () => {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const username = searchParams.get("username");

  const { resetPassword } = useAuth();

  const onSubmit = handleSubmit((data) => {
    setSubmitting(true);
    const payload = {
      username,
      ...data,
    };
    resetPassword(payload, { setSubmitting, setError });
  });

  return (
    <Box p={2}>
      <form onSubmit={onSubmit}>
        <Box mb={2}>
          <Controller
            name="code"
            control={control}
            rules={{ required: "Reset code is required." }}
            render={({ field }) => (
              <StyledTextField
                id="input-code"
                label="Reset code"
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
        <Box mb={2}>
          <Controller
            name="password"
            control={control}
            rules={{ required: "New password is required." }}
            render={({ field }) => (
              <StyledTextField
                id="input-new-password"
                type="password"
                autoComplete="on"
                label="New password"
                variant="outlined"
                {...field}
                inputProps={{
                  sx: { fontSize: "0.875rem", color: theme.palette.gray.light },
                }}
                fullWidth
              />
            )}
          />
        </Box>
        {error && (
          <Box mb={2}>
            <Typography color="error" variant="body2">
              {error.split(":")[1]}
            </Typography>
          </Box>
        )}
        <Box textAlign="center">
          <SubmitButton label="Submit" disabled={submitting} />
        </Box>
      </form>
    </Box>
  );
};

export { NewPasswordForm };
