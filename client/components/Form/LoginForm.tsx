import React from "react";
import Form from "@components/Form/Form";
import api from "@api/api-instance";
import { LoginResponse } from "@api/responseType";

const REGEX = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
};

interface LoginFormProps {}

const LoginForm = ({}: LoginFormProps) => {
  const [loginValidation, setLoginValidation] = React.useState({
    email: false,
    password: false,
  });
  const [formInputs, setFormInputs] = React.useState({
    email: "",
    password: "",
  });

  const requestLogin = async (): Promise<LoginResponse> => {
    return api
      .post("/users/login", {
        password: formInputs.password,
        email: formInputs.email,
      })
      .then((res) => res.json());
  };
  const handleSubmitLoginForm = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const { token, message } = await requestLogin();
      localStorage.setItem("token", token);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: emailInputValue } = e.target;
    const isEmailValid = REGEX.email.test(emailInputValue);
    setLoginValidation((p) => ({ ...p, email: isEmailValid }));
    setFormInputs((p) => ({ ...p, email: e.target.value }));
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: passwordInputValue } = e.target;
    const isPasswordValid = passwordInputValue.length >= 8;
    setLoginValidation((p) => ({ ...p, password: isPasswordValid }));
    setFormInputs((p) => ({ ...p, password: e.target.value }));
  };
  return (
    <Form onSubmit={handleSubmitLoginForm}>
      <label>
        Id
        <input
          name="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
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
      <Form.SubmitButton
        disabled={!(loginValidation.email && loginValidation.password)}
      >
        Login
      </Form.SubmitButton>
    </Form>
  );
};

export default LoginForm;
