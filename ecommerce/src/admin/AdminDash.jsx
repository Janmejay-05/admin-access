import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAdminAuthF } from "../redux/features/admin";
import axios from "axios";

const AdminDash = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { onlyUsers } = useSelector((state) => state.admin);
  console.log(onlyUsers);
  const [updatData, setUpdateData] = useState(() =>
    onlyUsers.map((user) => ({ ...user }))
  );

  function handleLogout() {
    dispatch(setAdminAuthF());
    navigate("/");
  }

  function handleRoleChange(index, value) {
    let changedValue = [...updatData];
    changedValue[index].role = value;
    setUpdateData(changedValue);
  }

  console.log(updatData);

  const handleSubmit = async () => {
    let object = [...updatData];
    object = object.filter((item) => item.role === "admin");

    console.log("final", object);
    try {
      if (object.length === 0) {
        alert("non of the user role changed");
        return;
      }

      const res = await axios.post(
        "http://localhost:8081/api/admin/userrole",
        object
      );
      console.log("admin response", res.data.message);
      alert(res.data.message);
      return;
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
      return;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-gray-900 to-black text-white py-10 px-6 flex justify-center items-start">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-2xl rounded-3xl p-10 shadow-[0_0_30px_rgba(0,255,255,0.1)]">
        <h1 className="text-4xl font-bold text-cyan-400 text-center mb-10">
          Admin Dashboard
        </h1>

        <div className="grid gap-6">
          {onlyUsers.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:shadow-xl transition duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-cyan-300 font-semibold text-xl">
                    {item.userName}
                  </span>
                  <span className="text-gray-300 text-sm">{item.email}</span>
                </div>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`role${index}`}
                      value="admin"
                      className="accent-cyan-400"
                      onChange={() => handleRoleChange(index, "admin")}
                    />
                    <span className="text-sm">Admin</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`role${index}`}
                      value="user"
                      defaultChecked
                      className="accent-cyan-400"
                      onChange={() => handleRoleChange(index, "user")}
                    />
                    <span className="text-sm">User</span>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center flex justify-center gap-6">
          <button
            onClick={handleSubmit}
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-lg py-3 px-8 rounded-full shadow-lg transition-all duration-300"
          >
            Submit
          </button>
          <button
            onClick={handleLogout}
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-lg py-3 px-8 rounded-full shadow-lg transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
