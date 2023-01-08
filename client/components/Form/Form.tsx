import React from "react";

interface FormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode | string;
  className?: string;
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
    <button
      type="submit"
      {...{ disabled, className }}
      className={`${className} bg-blue-500 text-white rounded-md p-2 cursor-pointer`}
    >
      {children}
    </button>
  );
};

const Form = ({ onSubmit, children, className }: FormProps) => {
  return (
    <form
      className={className}
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
