import { createSlice } from "@reduxjs/toolkit";

// reducer imports
import { initialState, extraReducers, reducers } from "./UsersAdminReducer";

const usersAdminSlice = createSlice({
  name: "usersAdmin",
  initialState,
  reducers,
  extraReducers,
});

export const { setStats, setAdminIds } = usersAdminSlice.actions;

export default usersAdminSlice.reducer;
