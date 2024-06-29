import { MDBToast } from "mdbreact";

// thunk imports
import {
  fetchUsersByHofIts,
  fetchAdmins,
  updateUser,
  bulkInsert,
  insertUser,
} from "./UsersAdminThunk";

export const initialState = {
  adminIds: [],
  stats: null,
  status: "idle",
  bulkInsertStatus: "idle",
  insertUserStatus: "idle",
};

export const reducers = {
  setAdminIds(state, { payload: adminIds }) {
    state.adminIds = adminIds;
  },
  setStats(state, { payload: stats }) {
    state.stats = stats;
  },
};

export function extraReducers(builder) {
  builder
    // fetchUsersByHofIts
    .addCase(fetchUsersByHofIts.pending, (state, _action) => {
      state.status = "loading";
    })
    .addCase(fetchUsersByHofIts.fulfilled, (state, _action) => {
      state.status = "succeeded";
    })
    .addCase(fetchUsersByHofIts.rejected, (state, _action) => {
      state.status = "failed";
      MDBToast.error("Unable to fetch family members.");
    })

    // fetchAdmins
    .addCase(fetchAdmins.pending, (state, _action) => {
      state.status = "loading";
    })
    .addCase(fetchAdmins.fulfilled, (state, _action) => {
      state.status = "succeeded";
    })
    .addCase(fetchAdmins.rejected, (state, _action) => {
      state.status = "failed";
      MDBToast.error("Unable to fetch details.");
    })

    // updateUser
    .addCase(updateUser.pending, (state, _action) => {
      state.status = "loading";
    })
    .addCase(updateUser.fulfilled, (state, _action) => {
      state.status = "succeeded";
      MDBToast.success("Updated successfully.");
    })
    .addCase(updateUser.rejected, (state, _action) => {
      state.status = "failed";
      MDBToast.error("Unable to update.");
    })

    // bulkInsert
    .addCase(bulkInsert.pending, (state, _action) => {
      state.bulkInsertStatus = "loading";
    })
    .addCase(bulkInsert.fulfilled, (state, { payload: message }) => {
      state.bulkInsertStatus = "succeeded";
      MDBToast.success(message);
    })
    .addCase(bulkInsert.rejected, (state, _action) => {
      state.bulkInsertStatus = "failed";
      MDBToast.error("Unable to add users.");
    })

    // insertUser
    .addCase(insertUser.pending, (state, _action) => {
      state.insertUserStatus = "loading";
    })
    .addCase(insertUser.fulfilled, (state, { payload: message }) => {
      state.insertUserStatus = "succeeded";
      MDBToast.success(message);
    })
    .addCase(insertUser.rejected, (state, _action) => {
      state.insertUserStatus = "failed";
      MDBToast.error("Unable to add user.");
    });
}
