import { createSlice } from "@reduxjs/toolkit";

// reducer imports
import { initialState, extraReducers, reducers } from "./EventsReducer";

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers,
  extraReducers,
});

export const { add, bulkAdd, setAccessibleEvents, update, remove } =
  eventsSlice.actions;

export default eventsSlice.reducer;
