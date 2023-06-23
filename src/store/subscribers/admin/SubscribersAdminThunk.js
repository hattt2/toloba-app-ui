import { createAsyncThunk } from "@reduxjs/toolkit";

// service imports
import subscribersAdminService from "../../../services/admin/subscribersAdminService";
import { fetchEvents } from "../../events/admin/EventsAdminThunk";

// store imports
import { bulkAdd } from "./SubscribersAdminSlice";

export const fetchSubscribers = createAsyncThunk(
  "adminSubscribers/fetchSubscribers",
  async ({ eventId }, { dispatch }) => {
    const { data: resData } = await subscribersAdminService.fetchSubscribers(
      eventId
    );
    const subscribers = resData.data;
    dispatch(bulkAdd({ eventId, subscribers }));
  }
);

export const updateSubscriber = createAsyncThunk(
  "adminSubscribers/update",
  async ({ eventId, subscriberId, host }, { dispatch }) => {
    await subscribersAdminService.update(eventId, subscriberId, host);
    dispatch(fetchSubscribers({ eventId }));
    dispatch(fetchEvents());
  }
);

export const bulkAddSubscribers = createAsyncThunk(
  "adminSubscribers/bulkAdd",
  async ({ eventId, itsNumbers }, { dispatch }) => {
    const { data: resData } = await subscribersAdminService.bulkAdd(
      eventId,
      itsNumbers
    );

    const subscribers = resData.data;
    dispatch(bulkAdd({ eventId, subscribers }));
    dispatch(fetchEvents());
  }
);

export const bulkRemoveSubscribers = createAsyncThunk(
  "adminSubscribers/bulkRemove",
  async ({ eventId, itsNumbers }, { dispatch }) => {
    const { data: resData } = await subscribersAdminService.bulkRemove(
      eventId,
      itsNumbers
    );

    const subscribers = resData.data;
    dispatch(bulkAdd({ eventId, subscribers }));
    dispatch(fetchEvents());
  }
);
