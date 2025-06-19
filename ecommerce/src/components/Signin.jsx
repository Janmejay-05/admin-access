import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { product, setData, setRole, setToken } from "../redux/features/login";
import { admin, mainAdmin } from "../redux/features/admin";

const Signin = () => {
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const [error, setError] = useState({ err1: "", err2: "" });
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.login);
  const navigate = useNavigate();

  console.log(token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8081/api/user/login",
        userDetails
      );
      console.log(res.data);
      if (res.data.message !== "successful") {
        alert("invalid credentials");
        return;
      }
      alert("login successful");
      dispatch(setToken(res.data.token));
      dispatch(setRole(res.data.role));
      dispatch(setData(res.data.data));
      if (res.data.role === "user") {
        dispatch(product({ ...res.data.data, token: res.data.token }));
        setTimeout(function () {
          navigate("/userdash");
        }, 300);
        return;
      }
      if (res.data.role === "admin") {
        dispatch(admin({ ...res.data.data, token: res.data.token }));
        setTimeout(function () {
          navigate("/admindash");
        }, 1000);
        return;
      }

      if (res.data.role === "main") {
        dispatch(mainAdmin({ ...res.data.data, token: res.data.token }));
        setTimeout(function () {
          navigate("/mainadmin");
        }, 1000);
        return;
      }
    } catch (err) {
      console.log(err);
      const errors = err.response.data?.result?.errors || [];
      const invalid = err.response.data?.invalid;
      console.log("invalid", invalid);

      console.log("errors", errors);

      let object = { err1: "", err2: "" };
      if (errors.length !== 0) {
        errors.forEach((item) => {
          console.log(item.path);

          if (item.path == "email") {
            object.err1 = item.msg;
            console.log("2");
          }

          if (item.path == "password") {
            object.err2 = item.msg;
            console.log("3");
          }
        });
      }

      if (invalid) {
        if (invalid == "wrong password" || invalid == "wrong email") {
          alert("invalid credentials");
          return;
        }
      }

      setError(object);
    }

    setUserDetails({ ...userDetails, userName: "", email: "", password: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-2xl p-8 sm:p-10 shadow-xl">
        <h2 className="text-center text-3xl font-extrabold text-cyan-400 mb-6">
          Welcome Back
        </h2>
        <p className="text-center text-gray-400 mb-8 text-sm">
          Sign in to your account to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-white">
              Email
            </label>
            <div className="flex items-center bg-gray-700 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-cyan-500">
              <Mail className="w-5 h-5 text-cyan-400 mr-3" />
              <input
                type="text"
                value={userDetails.email}
                placeholder="you@example.com"
                className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
              />
            </div>
            <p className="text-red-500 text-sm mt-1">{error.err1}</p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1 text-white">
              Password
            </label>
            <div className="flex items-center bg-gray-700 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-cyan-500">
              <Lock className="w-5 h-5 text-cyan-400 mr-3" />
              <input
                type="password"
                value={userDetails.password}
                placeholder="••••••••"
                className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                onChange={
                  (e) =>
                    setUserDetails({ ...userDetails, password: e.target.value }) // ⚠️ You probably meant `password` here
                }
              />
            </div>
            <p className="text-red-500 text-sm mt-1">{error.err2}</p>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition-colors duration-300 text-white font-semibold py-3 rounded-lg shadow-md"
          >
            Sign In
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <a href="/signup" className="text-cyan-400 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
