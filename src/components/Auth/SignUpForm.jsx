"use client";
import { Controller, useForm } from "react-hook-form";
import useRegister from "@/hooks/useRegister";
import {
  Box,
  Button,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
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

const SignUpForm = () => {
  const theme = useTheme();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const { register } = useRegister();

  const onSubmit = handleSubmit((data) => {
    setError("");
    setSubmitting(true);
    register(data, { setSubmitting, setError });
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
        <Box mb={2}>
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email is required." }}
            render={({ field }) => (
              <StyledTextField
                id="input-email"
                type="email"
                label="Email"
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
        <Box mb={2}>
          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is required." }}
            render={({ field }) => (
              <StyledTextField
                id="input-password"
                type="password"
                autoComplete="on"
                label="Password"
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
        <Box mb={2}>
          <Link href="/auth/login">
            <Typography fontSize={12} color="secondary">
              Already have an account? Log in
            </Typography>
          </Link>
        </Box>
        <Box textAlign="center">
          <SubmitButton label="Sign up" disabled={submitting} />
        </Box>
      </form>
    </Box>
  );
};

export { SignUpForm };
