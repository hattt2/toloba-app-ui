import { createSlice } from "@reduxjs/toolkit";

// reducer imports
import { initialState, extraReducers, reducers } from "./AuthReducer";

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers,
  extraReducers,
});

export const { setCurrentUserId, setRoles } = authSlice.actions;

export default authSlice.reducer;
