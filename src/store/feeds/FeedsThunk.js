import { createAsyncThunk } from "@reduxjs/toolkit";

// service imports
import feedsService from "../../services/feedsService";
import { bulkAdd, setActiveFeeds } from "./FeedsSlice";

export const fetchActiveFeeds = createAsyncThunk(
  "feeds/fetchActiveFeeds",
  async (_payload, { dispatch }) => {
    const { data: resData } = await feedsService.fetchActiveFeeds();
    const feeds = resData.data;
    dispatch(bulkAdd(feeds));
    dispatch(setActiveFeeds(feeds.map((feed) => feed._id)));
  }
);
