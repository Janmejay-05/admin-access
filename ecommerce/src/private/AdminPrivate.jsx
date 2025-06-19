import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminPrivate = ({ children }) => {
  const { AdminAuth } = useSelector((state) => state.admin);

  console.log("private AdminAuth", AdminAuth);

  return AdminAuth ? children : <Navigate to={"/"} />;
};

export default AdminPrivate;
