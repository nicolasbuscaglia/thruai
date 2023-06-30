import { useRouter } from "next/navigation";

export default function useRegister() {
  const router = useRouter();

  const register = (values, { setSubmitting, setError }) => {
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
      })
      .catch(async (err) => {
        const responseData = await err.json();
        setError(responseData.message);
        setSubmitting(false);
      });
  };

  const confirm = (values, { setSubmitting, setError }) => {
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
      })
      .catch(async (err) => {
        const responseData = await err.json();
        setError(responseData.message);
        setSubmitting(false);
      });
  };

  return {
    register,
    confirm,
  };
}
