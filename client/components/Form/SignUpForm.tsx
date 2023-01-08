import React from "react";
import Form from "@components/Form/Form";
import {
  FormInputPattern,
  FormRegex,
} from "@components/Form/form-input-pattern";
import api from "@api/api-instance";
import { LoginResponse } from "@api/responseType";
import { useRouter } from "next/navigation";

interface SignUpFormProps {}

const SignUpForm = ({}: SignUpFormProps) => {
  const router = useRouter();
  const [formInputs, setFormInputs] = React.useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const requestSignUp = async (): Promise<LoginResponse> => {
    return api
      .post("/users/create", {
        password: formInputs.password,
        email: formInputs.email,
      })
      .then((res) => res.json());
  };
  const handleSubmitSignUpForm = async () => {
    try {
      const { token, message } = await requestSignUp();
      router.push("/auth/login");
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

  const handleChangePasswordConfirm = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value: passwordInputValue } = e.target;
    setFormInputs((p) => ({ ...p, passwordConfirm: passwordInputValue }));
  };

  const isSignUpFormValid = React.useMemo(() => {
    return (
      FormRegex.email.test(formInputs.email) &&
      formInputs.password.length >= 8 &&
      formInputs.password === formInputs.passwordConfirm
    );
  }, [formInputs]);

  return (
    <Form onSubmit={handleSubmitSignUpForm}>
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

      <label>
        Password Confirm
        <input
          name="password-confirm"
          value={formInputs.passwordConfirm}
          onChange={handleChangePasswordConfirm}
          minLength={8}
        />
      </label>
      <Form.SubmitButton disabled={!isSignUpFormValid}>
        회원가입
      </Form.SubmitButton>
    </Form>
  );
};

export default SignUpForm;
