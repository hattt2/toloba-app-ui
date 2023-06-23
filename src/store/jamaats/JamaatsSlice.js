import { createSlice } from "@reduxjs/toolkit";

// reducer imports
import { initialState, extraReducers, reducers } from "./JamaatsReducer";

const jamaatsSlice = createSlice({
  name: "jamaats",
  initialState,
  reducers,
  extraReducers,
});

export const { bulkAdd } = jamaatsSlice.actions;

export default jamaatsSlice.reducer;
