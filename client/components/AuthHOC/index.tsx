import AlertDialog from "@components/Dialog/AuthAlertDialog";
import { useRouter } from "next/navigation";
import React from "react";

interface AuthHocProps {
  children: React.ReactNode;
}

const AuthHoc = ({ children }: AuthHocProps) => {
  const AuthCheck = () => {
    const loginToken =
      typeof window !== "undefined" && localStorage.getItem("token");

    return (
      <>
        {!loginToken && <AlertDialog />}
        {children}
      </>
    );
  };

  return <AuthCheck />;
};

export default AuthHoc;
