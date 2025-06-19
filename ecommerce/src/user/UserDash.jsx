import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserAuthF } from "../redux/features/login";

const UserDash = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(setUserAuthF());
    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-4">
      <div className="bg-white bg-opacity-5 backdrop-blur-md rounded-2xl p-8 shadow-xl max-w-md w-full text-center">
        <h1 className="text-2xl font-semibold text-cyan-400 mb-6">
          This is the user dashboard where the product will be shown
        </h1>
        <button
          onClick={handleLogout}
          className="bg-cyan-400 hover:bg-cyan-300 text-black font-semibold py-2 px-6 rounded-lg transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDash;
