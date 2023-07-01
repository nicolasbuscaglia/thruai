import { useRouter } from "next/navigation";

export default function useAuth() {
  const router = useRouter();

  const login = (values, { setSubmitting, setError }) => {
    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (!res.ok) throw res;
        router.push("/dashboard");
      })
      .catch(async (err) => {
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
        setError(responseData.message);
        setSubmitting(false);
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
        router.push("/auth/login");
      })
      .catch(async (err) => {
        const responseData = await err.json();
      });
  };

  const resetPasswordRequest = (values, { setSubmitting }) => {
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
      })
      .catch((err) => {
        setSubmitting(false);
      });
  };

  const resetPassword = (values, { setSubmitting, setError }) => {
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
      })
      .catch(async (err) => {
        const responseData = await err.json();
        setError(responseData.message);
        setSubmitting(false);
      });
  };

  return {
    login,
    logout,
    resetPasswordRequest,
    resetPassword,
  };
}
