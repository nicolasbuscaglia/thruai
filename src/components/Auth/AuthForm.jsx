import { Box, Typography, styled, useTheme } from "@mui/material";
import { SubmitButton } from "../SubmitButton";
import { Controller, useForm } from "react-hook-form";
import { StyledTextField } from "../StyledComponents/StyledTextField";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthError,
  selectIsAuthSubmitting,
  setAuthError,
  setIsAuthSubmitting,
} from "@/redux/features/uiSlice";
import { useState } from "react";
import { PasswordVisibility } from "../PasswordVisibility";

const StyledContainer = styled(Box)(({ theme }) => ({
  minWidth: "25rem",
  padding: "2rem",
  borderRadius: "1rem 1rem 0 0",
  backgroundColor: theme.palette.primary.main,
}));

const AuthForm = ({
  title,
  formFields,
  submitButtonLabel,
  onSubmitForm,
  descriptionComponent,
  bottomComponent,
  children,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const isSubmitting = useSelector((state) => selectIsAuthSubmitting(state));
  const error = useSelector((state) => selectAuthError(state));

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

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
    dispatch(setAuthError(""));
    dispatch(setIsAuthSubmitting(true));
    onSubmitForm(data);
  });

  useEffect(() => {
    return () => dispatch(setAuthError(""));
  }, []);

  return (
    <>
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
                        type={
                          formField.name === "password"
                            ? showPassword
                              ? "text"
                              : "password"
                            : formField.type
                        }
                        autoComplete={formField.autoComplete}
                        {...field}
                        InputProps={{
                          endAdornment: formField.type === "password" && (
                            <PasswordVisibility
                              handleClick={toggleShowPassword}
                              showPassword={showPassword}
                            />
                          ),
                        }}
                        inputProps={{
                          sx: { color: theme.palette.gray.light },
                        }}
                        fullWidth
                        disabled={isSubmitting}
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
                {error.split(":").slice(-1)}
              </Typography>
            </Box>
          )}
          {descriptionComponent}
          <Box textAlign="center">
            <SubmitButton
              label={submitButtonLabel}
              disabled={isSubmitting}
              fullWidth
            />
          </Box>
          {children}
        </form>
      </StyledContainer>
      {bottomComponent}
    </>
  );
};

export { AuthForm };
