import AuthAlertDialog from "@components/Dialog/AuthAlertDialog";
import React from "react";

interface AuthHocProps {
  children: React.ReactNode;
}

const AuthHoc = ({ children }: AuthHocProps) => {
  const AuthCheck = () => {
    const [hasLoginToken, setHasLoginToken] = React.useState(true);
    // avoid hydration error
    React.useEffect(() => {
      const loginToken =
        typeof window !== "undefined" && localStorage.getItem("token");
      setHasLoginToken(!!loginToken);
    }, []);
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
