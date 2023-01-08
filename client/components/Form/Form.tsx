import React from "react";

interface FormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

type FormSubmitButton = {
  children: React.ReactNode | string;
  disabled?: boolean;
  className?: string;
};

const FormSubmitButton = ({
  children,
  disabled,
  className,
}: FormSubmitButton) => {
  return (
    <button type="submit" {...{ disabled, className }}>
      {children}
    </button>
  );
};

const Form = ({ onSubmit, children }: React.PropsWithChildren<FormProps>) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
      {children}
    </form>
  );
};

Form.SubmitButton = FormSubmitButton;

export default Form;
