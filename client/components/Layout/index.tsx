import GNB from "@components/GNB";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-5/12 my-0 mx-auto mt-4">
      <GNB />
      {children}
    </div>
  );
};

export default Layout;
