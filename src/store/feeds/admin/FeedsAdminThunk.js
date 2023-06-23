import { createAsyncThunk } from "@reduxjs/toolkit";

// service imports
import feedsAdminService from "../../../services/admin/feedsAdminService";

export const fetchFeeds = createAsyncThunk(
  "adminFeeds/fetchFeeds",
  async () => {
    const { data: resData } = await feedsAdminService.fetchFeeds();
    return resData.data;
  }
);
