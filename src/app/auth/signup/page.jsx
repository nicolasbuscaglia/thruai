"use client";
import { AuthForm } from "@/components/Auth/AuthForm";
import { LoginLink } from "@/components/Auth/LoginLink";
import { SignUpTermsPolicy } from "@/components/Auth/SignUpTermsPolicy";
import { StyledAuthFormBottomBox } from "@/components/StyledComponents/StyledAuthFormBottomBox";
import { GoogleButton } from "@/components/StyledComponents/StyledGoogleButton";
import useRegister from "@/hooks/useRegister";
import { setIsAuthSubmitting } from "@/redux/features/uiSlice";
import { Box, Typography, useTheme } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
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
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    id: 3,
    name: "password",
    label: "Password",
    type: "password",
    autoComplete: "on",
  },
];

const submitButtonLabel = "Get Started";

const SignUp = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { register, googleSignUpSuccess, googleSignUpFailure } = useRegister();

  const onSubmitForm = (data) => {
    register(data);
  };

  const signUpWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) =>
      googleSignUpSuccess({ access_token: tokenResponse.access_token }),
    onError: (err) => googleSignUpFailure(err),
    onNonOAuthError: () => dispatch(setIsAuthSubmitting(false)),
  });

  const handleSignUpWithGoogle = () => {
    dispatch(setIsAuthSubmitting(true));
    signUpWithGoogle();
  };

  return (
    <Box p={2}>
      <AuthForm
        title="Sign up to your account"
        formFields={formFields}
        submitButtonLabel={submitButtonLabel}
        onSubmitForm={onSubmitForm}
        descriptionComponent={<SignUpTermsPolicy />}
        bottomComponent={
          <StyledAuthFormBottomBox>
            <LoginLink />
          </StyledAuthFormBottomBox>
        }
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
          <GoogleButton handleClick={handleSignUpWithGoogle} />
        </Box>
      </AuthForm>
    </Box>
  );
};

export default SignUp;
