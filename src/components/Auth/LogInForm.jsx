"use client";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
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

const LogInForm = () => {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { login, validateAccessToken } = useAuth();

  const onSubmit = handleSubmit((data) => {
    setError("");
    setSubmitting(true);
    login(data, { setSubmitting, setError });
  });

  useEffect(() => {
    validateAccessToken({ setIsLoading });
  }, []);

  const confirmed = searchParams.get("confirmed");

  if (isLoading) {
    return (
      <Box p={2}>
        <CircularProgress color="secondary" size={25} />
      </Box>
    );
  }

  return (
    <Box p={2}>
      {confirmed === "true" && (
        <Box mb={2}>
          <Typography color="secondary">{"You're signed up!"}</Typography>
        </Box>
      )}
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
        <Box textAlign="center">
          <SubmitButton label="Log in" disabled={submitting} />
        </Box>
      </form>
    </Box>
  );
};

export { LogInForm };
