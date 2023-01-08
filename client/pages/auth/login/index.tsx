import React from "react";
import LoginForm from "@components/Form/LoginForm";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const loginToken =
    typeof window !== "undefined" && localStorage.getItem("token");
  if (loginToken) {
    router.replace("/");
  }
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
