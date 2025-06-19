import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const admin = createAsyncThunk("admin", async (userData) => {
  try {
    const res = await axios.get("http://localhost:8081/admin", {
      headers: {
        Authorization: `Bearer ${userData.token}`,
        user: JSON.stringify({
          email: userData.email,
          password: userData.password,
        }),
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data.message;
  }
});

export const mainAdmin = createAsyncThunk("mainAdmin", async (userData) => {
  try {
    const res = await axios.get("http://localhost:8081/mainadmin", {
      headers: {
        Authorization: `Bearer ${userData.token}`,
        user: JSON.stringify({
          email: userData.email,
          password: userData.password,
        }),
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data.message;
  }
});

const initialState = {
  AdminAuth: false,
  mainAdminAuth: false,
  onlyUsers: {},
  allUsers: {},
};
export const adminSlice = createSlice({
  name: "loginUser",
  initialState,
  reducers: {
    setAdminAuthF: (state) => {
      state.AdminAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(admin.fulfilled, (state, action) => {
      console.log("Action 1", action.payload);
      if (action.payload !== "unauthorized") {
        state.AdminAuth = true;
        state.onlyUsers = action.payload.userData;
      }
      console.log(state.AdminAuth);
    });
    builder.addCase(mainAdmin.fulfilled, (state, action) => {
      console.log("Action 1", action.payload);
      if (action.payload !== "unauthorized") {
        state.mainAdminAuth = true;
        state.allUsers = action.payload.userData;
      }
      console.log(state.AdminAuth);
    });
  },
});

export const { setAdminAuthF } = adminSlice.actions;
export default adminSlice.reducer;
