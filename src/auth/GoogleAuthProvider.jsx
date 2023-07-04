"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GoogleAuthProviders = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
};

export { GoogleAuthProviders };
