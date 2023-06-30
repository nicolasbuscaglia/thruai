"use client";
import { Controller, useForm } from "react-hook-form";
import useRegister from "@/hooks/useRegister";
import { useSearchParams } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
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

const ConfirmForm = () => {
  const searchParams = useSearchParams();
  const theme = useTheme();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const { confirm } = useRegister();

  const onSubmit = handleSubmit((data) => {
    const username = searchParams.get("username");
    setSubmitting(true);
    const payload = {
      username: username,
      code: data.code,
    };
    confirm(payload, { setSubmitting, setError });
  });

  return (
    <Box p={2}>
      <form onSubmit={onSubmit}>
        <Box mb={2}>
          <Controller
            name="code"
            control={control}
            rules={{ required: "Confirmation code is required." }}
            render={({ field }) => (
              <StyledTextField
                id="input-code"
                label="Confirmation code"
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
        {error && (
          <Box mb={2}>
            <Typography color="error" variant="body2">
              {error.split(":")[1]}
            </Typography>
          </Box>
        )}
        <Box textAlign="center">
          <SubmitButton label="Confirm" disabled={submitting} />
        </Box>
      </form>
    </Box>
  );
};

export { ConfirmForm };
