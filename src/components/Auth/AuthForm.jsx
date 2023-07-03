import { Box, Typography, styled, useTheme } from "@mui/material";
import { SubmitButton } from "../SubmitButton";
import { Controller, get, useForm } from "react-hook-form";
import { StyledTextField } from "../StyledComponents/StyledTextField";
import { useState } from "react";

const StyledContainer = styled(Box)(({ theme }) => ({
  minWidth: "25rem",
  padding: "2rem",
  borderRadius: "1rem",
  backgroundColor: theme.palette.primary.main,
}));

const AuthForm = ({
  title,
  formFields,
  submitButtonLabel,
  onSubmitForm,
  children,
}) => {
  const theme = useTheme();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  let defaultValues = {};
  formFields?.forEach((field) => {
    defaultValues[`${field.name}`] = "";
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  const onSubmit = handleSubmit(async (data) => {
    setError("");
    setSubmitting(true);
    onSubmitForm(data, { setSubmitting, setError });
  });

  return (
    <StyledContainer>
      {title && (
        <Box mb={3}>
          <Typography variant="h6" color="secondary" textAlign="center">
            {title}
          </Typography>
        </Box>
      )}

      <form onSubmit={onSubmit}>
        <Box mb={3}>
          {formFields.map((formField) => {
            return (
              <Box mb={2} key={formField.id}>
                <Controller
                  name={formField.name}
                  control={control}
                  rules={{ required: `${formField.label} is required.` }}
                  render={({ field }) => (
                    <StyledTextField
                      id={`input-${formField.name}`}
                      label={formField.label}
                      variant="outlined"
                      type={formField.type}
                      autoComplete={formField.autoComplete}
                      {...field}
                      inputProps={{
                        sx: { color: theme.palette.gray.light },
                      }}
                      fullWidth
                      disabled={submitting}
                    />
                  )}
                />
              </Box>
            );
          })}
        </Box>
        {error && (
          <Box mb={2}>
            <Typography color="error" variant="body2">
              {error.split(":")[1]}
            </Typography>
          </Box>
        )}
        {children}
        <Box textAlign="center">
          <SubmitButton label={submitButtonLabel} disabled={submitting} />
        </Box>
      </form>
    </StyledContainer>
  );
};

export { AuthForm };
