import React from "react";
import Form from "@components/Form/Form";
import {
  FormInputPattern,
  FormRegex,
} from "@components/Form/form-input-pattern";
import api from "@api/api-instance";
import { LoginResponse } from "@api/responseType";
import { useRouter } from "next/navigation";

interface LoginFormProps {}

const LoginForm = ({}: LoginFormProps) => {
  const router = useRouter();
  const [formInputs, setFormInputs] = React.useState({
    email: "",
    password: "",
  });

  const requestLogin = async (): Promise<LoginResponse> => {
    return api
      .post("/users/login", {
        email: formInputs.email,
        password: formInputs.password,
      })
      .then((res) => res.json());
  };
  const handleSubmitLoginForm = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const { token, message } = await requestLogin();
      localStorage.setItem("token", token);
      router.replace("/");
    } catch (e) {
      console.error(e);
    }
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: emailInputValue } = e.target;
    setFormInputs((p) => ({ ...p, email: emailInputValue }));
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: passwordInputValue } = e.target;
    setFormInputs((p) => ({ ...p, password: passwordInputValue }));
  };

  const isLoginFormValid = React.useMemo(() => {
    return (
      FormRegex.email.test(formInputs.email) && formInputs.password.length >= 8
    );
  }, [formInputs]);

  return (
    <Form onSubmit={handleSubmitLoginForm}>
      <label>
        Id
        <input
          name="email"
          pattern={FormInputPattern.email}
          value={formInputs.email}
          onChange={handleChangeEmail}
        />
      </label>
      <label>
        Password
        <input
          name="password"
          value={formInputs.password}
          onChange={handleChangePassword}
          minLength={8}
        />
      </label>
      <Form.SubmitButton disabled={!isLoginFormValid}>Login</Form.SubmitButton>
    </Form>
  );
};

export default LoginForm;
