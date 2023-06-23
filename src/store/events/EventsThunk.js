import { createAsyncThunk } from "@reduxjs/toolkit";

// service imports
import eventsService from "../../services/eventsService";

// store imports
import { add, bulkAdd, setAccessibleEvents } from "./EventsSlice";

export const fetchAccessibleEvents = createAsyncThunk(
  "events/fetchAccessibleEvents",
  async (_payload, { dispatch }) => {
    const { data: resData } = await eventsService.fetchAccessibleEvents();
    const events = resData.data;
    dispatch(bulkAdd(events));
    dispatch(setAccessibleEvents(events.map((e) => e._id)));
  }
);

export const fetchEventById = createAsyncThunk(
  "events/fetchEventById",
  async (eventId, { dispatch }) => {
    const { data: resData } = await eventsService.fetchEventById(eventId);
    const event = resData.data;
    dispatch(add(event));
  }
);
