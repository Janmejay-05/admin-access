import React, { useState } from "react";
import { Mail, Lock, User, X } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({ err1: "", err2: "", err3: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await axios.post(
        "http://localhost:8081/api/user/register",
        userDetails
      );
      console.log(res.data);
      if (res.data.message == "successful") {
        alert("account created");
        navigate("/");
      } else {
        alert("invalid credentials");
      }
    } catch (err) {
      console.log(err);
      const errors = err.response.data?.result?.errors || [];
      const invalid = err.response.data?.message;
      // console.log(errors);

      //   setError({ ...error, userName: "", email: "", password: "" });
      //   console.log(error);
      let object = { err1: "", err2: "", err3: "" };
      if (errors.lenght == 0) {
        errors.forEach((item) => {
          console.log(item.path);

          if (item.path == "userName") {
            object.err1 = item.msg;
            console.log("1");
          }

          if (item.path == "email") {
            object.err2 = item.msg;
            console.log("2");
          }

          if (item.path == "password") {
            object.err3 = item.msg;
            console.log("3");
          }
        });
      }

      if (invalid) {
        alert(invalid);
      }

      setError(object);
    }

    setUserDetails({ ...userDetails, userName: "", email: "", password: "" });
  };
  console.log(error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-4 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-md bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-2xl p-8 sm:p-10 shadow-xl">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-center text-3xl font-extrabold text-cyan-400 mb-6">
          Create an Account
        </h2>
        <p className="text-center text-gray-400 mb-8 text-sm">
          Fill in the details to register
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-1 text-white">
              Username
            </label>
            <div className="flex items-center bg-gray-700 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-cyan-500">
              <User className="w-5 h-5 text-cyan-400 mr-3" />
              <input
                type="text"
                value={userDetails.userName}
                placeholder="janmejay123"
                className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, userName: e.target.value })
                }
              />
            </div>
            <p className="text-red-500 text-sm mt-1">{error.err1}</p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-white">
              Email
            </label>
            <div className="flex items-center bg-gray-700 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-cyan-500">
              <Mail className="w-5 h-5 text-cyan-400 mr-3" />
              <input
                type="email"
                value={userDetails.email}
                placeholder="you@example.com"
                className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
              />
            </div>
            <p className="text-red-500 text-sm mt-1">{error.err2}</p>
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
                onChange={(e) =>
                  setUserDetails({ ...userDetails, password: e.target.value })
                }
              />
            </div>
            <p className="text-red-500 text-sm mt-1">{error.err3}</p>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition-colors duration-300 text-white font-semibold py-3 rounded-lg shadow-md"
          >
            Sign Up
          </button>
        </form>

        {/* Sign In Link */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/" className="text-cyan-400 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
