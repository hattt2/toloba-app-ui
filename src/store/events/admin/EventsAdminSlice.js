import { createSlice } from "@reduxjs/toolkit";

// reducer imports
import { initialState, extraReducers, reducers } from "./EventsAdminReducer";

const eventsAdminSlice = createSlice({
  name: "eventsAdmin",
  initialState,
  reducers,
  extraReducers,
});

// export const { } = eventsAdminSlice.actions;

export default eventsAdminSlice.reducer;
