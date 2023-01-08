import SignUpForm from "@components/Form/SignUpForm";
import React from "react";

interface IndexProps {}

const SignUpPage = ({}: IndexProps) => {
  return (
    <div>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
