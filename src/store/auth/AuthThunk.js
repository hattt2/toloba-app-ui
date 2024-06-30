import { createAsyncThunk } from "@reduxjs/toolkit";

// service imports
import authService from "../../services/authService";

// store imports
import { setCurrentUserId, setRoles } from "./AuthSlice";
import { fetchProfile } from "../users/UsersThunk";

export const login = createAsyncThunk(
  "auth/login",
  async ({ itsNumber, password, magicToken }, { dispatch }) => {
    const user = await authService.login(itsNumber, password, magicToken);
    dispatch(fetchProfile());
    dispatch(setCurrentUserId(user?._id));
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  (_payload, { dispatch }) => {
    authService.logout();
    dispatch(setCurrentUserId(null));
  }
);

export const fetchRoles = createAsyncThunk(
  "auth/fetchRoles",
  async (_payload, { dispatch }) => {
    const { data: resData } = await authService.fetchRoles();
    const roles = resData.data;
    dispatch(setRoles(roles));
  }
);
