import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import { Spin } from "antd";
import { AuthContext } from "./AuthContext";

const Layout = ({ children }) => {
  const { isLoading } = useContext(AuthContext);
  return (
    <>
      <Navbar />
      {isLoading ? (
        <div
          className="flex w-full items-center justify-center"
          style={{ height: "calc(100vh - 3.5rem)" }}
        >
          <Spin size="large" />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default Layout;
