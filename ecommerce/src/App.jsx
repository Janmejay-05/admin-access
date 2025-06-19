import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import AdminDash from "./admin/AdminDash";
import UserDash from "./user/UserDash";
import ProductPrivate from "./private/ProductPrivate";
import AdminPrivate from "./private/AdminPrivate";
import MainAdmin from "./admin/MainAdmin";
import MainAdminPrivate from "./private/MainAdminPrivate";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/admindash"
          element={
            <AdminPrivate>
              <AdminDash />
            </AdminPrivate>
          }
        />

        <Route
          path="/mainadmin"
          element={
            <MainAdminPrivate>
              <MainAdmin />
            </MainAdminPrivate>
          }
        />
        <Route
          path="/userdash"
          element={
            <ProductPrivate>
              <UserDash />
            </ProductPrivate>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
