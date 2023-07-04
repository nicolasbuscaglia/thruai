"use client";
import { AuthForm } from "@/components/Auth/AuthForm";
import { SignUpLink } from "@/components/Auth/SignUpLink";
import { GoogleButton } from "@/components/StyledComponents/StyledGoogleButton";
import useAuth from "@/hooks/useAuth";
import { setIsAuthSubmitting } from "@/redux/features/uiSlice";
import { Box, Typography, useTheme } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";

const formFields = [
  {
    id: 1,
    name: "username",
    label: "Username",
    type: "text",
  },
  {
    id: 2,
    name: "password",
    label: "Password",
    type: "password",
    autoComplete: "on",
  },
];

const submitButtonLabel = "Log in";

const LogIn = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { login, googleLoginSuccess, googleLoginFailure } = useAuth();
  const searchParams = useSearchParams();
  const confirmed = searchParams.get("confirmed");

  const onSubmitForm = (data) => {
    login(data);
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) =>
      googleLoginSuccess({ access_token: tokenResponse.access_token }),
    onError: (err) => console.error(err),
    onNonOAuthError: () => dispatch(setIsAuthSubmitting(false)),
  });

  const handleLoginWithGoogle = () => {
    dispatch(setIsAuthSubmitting(true));
    loginWithGoogle();
  };

  return (
    <Box p={2}>
      {confirmed === "true" && (
        <Box mb={2}>
          <Typography color="secondary">{"You're signed up!"}</Typography>
        </Box>
      )}
      <AuthForm
        title="Login to your account"
        formFields={formFields}
        submitButtonLabel={submitButtonLabel}
        onSubmitForm={onSubmitForm}
        bottomComponent={<SignUpLink />}
      >
        <Box my={1}>
          <Typography
            variant="body2"
            textAlign="center"
            sx={{ color: theme.palette.gray.main }}
          >
            OR
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center">
          <GoogleButton handleClick={handleLoginWithGoogle} />
        </Box>
      </AuthForm>
    </Box>
  );
};

export default LogIn;
