import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const product = createAsyncThunk("product", async (userData) => {
  try {
    const res = await axios.get("http://localhost:8081/product", {
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
  userAuth: false,

  data: {},
  role: "",
  token: "",
};
export const loginSlice = createSlice({
  name: "loginUser",
  initialState,
  reducers: {
    setToken: (state, action) => {
      console.log("token", action.payload);
      state.token = action.payload;
    },
    setRole: (state, action) => {
      console.log("role", action.payload);

      state.role = action.payload;
    },
    setData: (state, action) => {
      console.log("Data", action.payload);
      state.data = action.payload;
    },
    setUserAuthF: (state) => {
      state.userAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(product.fulfilled, (state, action) => {
      console.log("Action 2", action.payload);

      if (action.payload !== "unauthorized") {
        state.userAuth = true;
        // <Navigate to={"/userAuth"} />;
      }
      console.log(state.userAuth);
    });
  },
});

export const { setToken, setRole, setData, setUserAuthF } = loginSlice.actions;
export default loginSlice.reducer;
