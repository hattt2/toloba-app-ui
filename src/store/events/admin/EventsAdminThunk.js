import { createAsyncThunk } from "@reduxjs/toolkit";

// service imports
import eventsAdminService from "../../../services/admin/eventsAdminService";

// store imports
import { bulkAdd, add, update, remove } from "../EventsSlice";

export const fetchEvents = createAsyncThunk(
  "adminEvents/fetchEvents",
  async (_payload, { dispatch }) => {
    const { data: resData } = await eventsAdminService.fetchEvents();
    const events = resData.data;
    dispatch(bulkAdd(events));
  }
);

export const addEvent = createAsyncThunk(
  "adminEvents/addEvent",
  async ({ requestBody }, { dispatch }) => {
    const { data: resData } = await eventsAdminService.add(requestBody);
    const event = resData.data;
    dispatch(add(event));
  }
);

export const updateEvent = createAsyncThunk(
  "adminEvents/updateEvent",
  async ({ eventId, requestBody }, { dispatch }) => {
    const { data: resData } = await eventsAdminService.update(
      eventId,
      requestBody
    );
    const event = resData.data;
    dispatch(update(event));
  }
);

export const removeEvent = createAsyncThunk(
  "adminEvents/removeEvent",
  async ({ eventId }, { dispatch }) => {
    await eventsAdminService.remove(eventId);
    dispatch(remove(eventId));
  }
);
