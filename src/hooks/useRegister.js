import { setAuthError, setIsAuthSubmitting } from "@/redux/features/uiSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function useRegister() {
  const router = useRouter();
  const dispatch = useDispatch();

  const register = (values) => {
    fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (!res.ok) throw res;
        router.push(`/auth/confirm?username=${values?.username}`);
        dispatch(setIsAuthSubmitting(false));
      })
      .catch(async (err) => {
        const responseData = await err.json();
        dispatch(setAuthError(responseData.message));
        dispatch(setIsAuthSubmitting(false));
      });
  };

  const confirm = (values) => {
    fetch("/api/auth/confirm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (!res.ok) throw res;
        router.push("/auth/login?confirmed=true");
        dispatch(setIsAuthSubmitting(false));
      })
      .catch(async (err) => {
        const responseData = await err.json();
        dispatch(setAuthError(responseData.message));
        dispatch(setIsAuthSubmitting(false));
      });
  };

  const googleSignUpSuccess = (googleResponse) => {
    fetch("/api/auth/google/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ access_token: googleResponse?.access_token }),
    })
      .then((res) => {
        if (!res.ok) throw res;
        router.push("/auth/login?confirmed=true");
        dispatch(setIsAuthSubmitting(false));
      })
      .catch(async (err) => {
        const responseData = await err.json();
        dispatch(setAuthError(responseData.message));
        dispatch(setIsAuthSubmitting(false));
      });
  };

  const googleSignUpFailure = (googleResponse) => {
    console.error(googleResponse);
  };

  return {
    register,
    confirm,
    googleSignUpSuccess,
    googleSignUpFailure,
  };
}
