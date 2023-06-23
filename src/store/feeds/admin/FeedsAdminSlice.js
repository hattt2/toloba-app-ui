import { createSlice } from "@reduxjs/toolkit";

// reducer imports
import { initialState, extraReducers, reducers } from "./FeedsAdminReducer";

const feedsAdminSlice = createSlice({
  name: "feedsAdmin",
  initialState,
  reducers,
  extraReducers,
});

// export const { } = feedsAdminSlice.actions;

export default feedsAdminSlice.reducer;
