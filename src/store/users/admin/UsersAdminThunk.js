import { createAsyncThunk } from "@reduxjs/toolkit";

// service imports
import usersAdminService from "../../../services/admin/usersAdminService";
import { setAdminIds, setStats } from "./UsersAdminSlice";

// reducer imports
import { bulkAdd, update } from "../UsersSlice";

export const fetchUsersByHofIts = createAsyncThunk(
  "adminUsers/fetchUsersByHofIts",
  async (hofIts, { dispatch }) => {
    const { data: resData } = await usersAdminService.fetchUsersByHofIts(
      hofIts
    );

    const users = resData.data;
    dispatch(bulkAdd(users));
  }
);

export const fetchAdmins = createAsyncThunk(
  "adminUsers/fetchAdmins",
  async (_payload, { dispatch }) => {
    const { data: resData } = await usersAdminService.fetchUsers("", true);
    const admins = resData.data;
    const adminIds = admins?.map((admin) => admin._id);
    dispatch(bulkAdd(admins));
    dispatch(setAdminIds(adminIds));
  }
);

export const updateUser = createAsyncThunk(
  "adminUsers/updateUser",
  async ({ userId, profile }, { dispatch }) => {
    const { data: resData } = await usersAdminService.updateUser(
      userId,
      profile
    );

    const user = resData.data;
    dispatch(update(user));
    dispatch(fetchAdmins());
  }
);

export const bulkInsert = createAsyncThunk(
  "adminUsers/bulkInsert",
  async (users, { dispatch }) => {
    const { data: resData } = await usersAdminService.bulkInsert(users);
    dispatch(fetchStats());
    return resData.data;
  }
);

export const insertUser = createAsyncThunk(
  "adminUsers/insertUser",
  async (user, { dispatch }) => {
    const { data: resData } = await usersAdminService.insertUser(user);
    dispatch(fetchStats());
    return resData.data;
  }
);

export const fetchStats = createAsyncThunk(
  "adminUsers/fetchStats",
  async (_payload, { dispatch }) => {
    const { data: resData } = await usersAdminService.fetchStats();
    const stats = resData.data;
    dispatch(setStats(stats));
  }
);
