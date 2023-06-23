import { createSlice } from "@reduxjs/toolkit";

// reducer imports
import {
  initialState,
  extraReducers,
  reducers,
} from "./SubscribersAdminReducer";

const subscribersAdminSlice = createSlice({
  name: "subscribersAdmin",
  initialState,
  reducers,
  extraReducers,
});

export const { bulkAdd } = subscribersAdminSlice.actions;

export default subscribersAdminSlice.reducer;
