import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const MainAdminPrivate = ({ children }) => {
  const { mainAdminAuth } = useSelector((state) => state.admin);

  console.log("private AdminAuth", mainAdminAuth);

  return mainAdminAuth ? children : <Navigate to={"/"} />;
};

export default MainAdminPrivate;
