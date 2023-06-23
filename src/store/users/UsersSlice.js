import { createSlice } from "@reduxjs/toolkit";

// reducer imports
import { initialState, extraReducers, reducers } from "./UsersReducer";

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers,
  extraReducers,
});

export const { add, bulkAdd, update, addRoles, addStats } = usersSlice.actions;

export default usersSlice.reducer;
