import { createSlice } from "@reduxjs/toolkit";

// reducer imports
import { initialState, extraReducers, reducers } from "./FeedsReducer";

const feedsSlice = createSlice({
  name: "feeds",
  initialState,
  reducers,
  extraReducers,
});

export const { bulkAdd, setActiveFeeds } = feedsSlice.actions;

export default feedsSlice.reducer;
