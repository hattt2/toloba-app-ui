import { createAsyncThunk } from "@reduxjs/toolkit";

// service imports
import usersService from "../../services/usersService";

// reducer imports
import { add, update } from "./UsersSlice";

export const fetchProfile = createAsyncThunk(
  "users/fetchProfile",
  async (_payload, { dispatch }) => {
    const { data: resData } = await usersService.fetchProfile();
    const user = resData.data;
    dispatch(add(user));
    return user?._id;
  }
);

export const updateProfile = createAsyncThunk(
  "users/updateProfile",
  async ({ profile }, { dispatch }) => {
    const { data: resData } = await usersService.updateProfile(profile);
    const user = resData.data;
    dispatch(update(user));
  }
);
