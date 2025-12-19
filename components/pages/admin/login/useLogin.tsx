import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth.context";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login gagal");
    } finally {
      setIsLoading(false);
    }
  };
  return {
    handleSubmit,
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
  };
};

export default useLogin;
