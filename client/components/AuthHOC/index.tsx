import AuthAlertDialog from "@components/Dialog/AuthAlertDialog";
import React from "react";

interface AuthHocProps {
  children: React.ReactNode;
}

const AuthHoc = ({ children }: AuthHocProps) => {
  const AuthCheck = () => {
    const loginToken =
      typeof window !== "undefined" && localStorage.getItem("token");
    const [hasLoginToken, setHasLoginToken] = React.useState(false);
    // avoid hydration error
    React.useEffect(() => {
      setHasLoginToken(!!loginToken);
    }, []);
    if (!hasLoginToken) return <></>;
    // rerender after mounted checking has login token
    return (
      <>
        {!hasLoginToken && <AuthAlertDialog />}
        {children}
      </>
    );
  };

  return <AuthCheck />;
};

export default AuthHoc;
