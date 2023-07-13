import { setAuthError, setIsAuthSubmitting } from "@/redux/features/uiSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function useAuth() {
  const router = useRouter();
  const dispatch = useDispatch();

  const login = (values) => {
    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (!res.ok) throw res;
        window.location.href = "/dashboard";
      })
      .catch(async (err) => {
        try {
          const responseData = await err.json();
          if (responseData?.message?.includes("UserNotConfirmedException:")) {
            await fetch("/api/auth/resendCode", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username: values.username }),
            });
            router.push(`/auth/confirm?username=${values.username}`);
          }
          dispatch(setAuthError(responseData.message));
        } catch (err) {
          dispatch(setAuthError("Error logging in"));
        }
        dispatch(setIsAuthSubmitting(false));
      });
  };

  const logout = () => {
    fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw res;
        window.location.href = "/auth/login";
      })
      .catch(async (err) => {
        const responseData = await err.json();
      });
  };

  const resetPasswordRequest = (values) => {
    fetch("/api/auth/password/resetRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (!res.ok) throw res;
        router.push(`/auth/password/new?username=${values.username}`);
        dispatch(setIsAuthSubmitting(false));
      })
      .catch((err) => {
        dispatch(setIsAuthSubmitting(false));
      });
  };

  const resetPassword = (values) => {
    fetch("/api/auth/password/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (!res.ok) throw res;
        router.push("/auth/login?reset=true");
        dispatch(setIsAuthSubmitting(false));
      })
      .catch(async (err) => {
        const responseData = await err.json();
        dispatch(setAuthError(responseData.message));
        dispatch(setIsAuthSubmitting(false));
      });
  };

  const googleLoginSuccess = (googleResponse) => {
    fetch("/api/auth/google/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ access_token: googleResponse?.access_token }),
    })
      .then((res) => {
        if (!res.ok) throw res;
        window.location.href = "/dashboard";
      })
      .catch(async (err) => {
        const responseData = await err.json();
        dispatch(setAuthError(responseData.message));
        dispatch(setIsAuthSubmitting(false));
      });
  };

  const googleLoginFailure = (googleResponse) => {
    console.error(googleResponse);
  };

  return {
    login,
    googleLoginSuccess,
    googleLoginFailure,
    logout,
    resetPasswordRequest,
    resetPassword,
  };
}
