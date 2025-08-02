import React from "react";
import Header from "./Header";

function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default CommonLayout;
