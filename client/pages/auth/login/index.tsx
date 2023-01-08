import React from "react";

interface IndexProps {}

const REGEX = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
};

const LoginPage = ({}: IndexProps) => {
  const [loginValidation, setLoginValidation] = React.useState({
    email: false,
    password: false,
  });
  const [formInputs, setFormInputs] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmitLoginForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    <div>
      <form onSubmit={handleSubmitLoginForm}>
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
        <button disabled={!(loginValidation.email && loginValidation.password)}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
