import { configureStore } from "@reduxjs/toolkit";
import login from "./features/login";
import admin from "./features/admin";

export const store = configureStore({
  reducer: {
    login: login,
    admin: admin,
  },
});
