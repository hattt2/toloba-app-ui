import { fetchFeeds } from "./admin/FeedsAdminThunk";

export const initialState = {
  status: "idle",
};

export const reducers = {
  //
};

export function extraReducers(builder) {
  builder
    // fetchFeeds
    .addCase(fetchFeeds.pending, (state, _action) => {
      state.status = "loading";
    })
    .addCase(fetchFeeds.fulfilled, (state, _action) => {
      state.status = "succeeded";
    })
    .addCase(fetchFeeds.rejected, (state, _action) => {
      state.status = "failed";
    });
}
