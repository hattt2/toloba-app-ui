// thunk imports
import { fetchActiveFeeds } from "./FeedsThunk";

export const initialState = {
  entities: {},
  activeFeeds: [],
  status: "idle",
};

export const reducers = {
  bulkAdd(state, { payload: feeds }) {
    const newEntities = { ...state.entities };

    if (feeds) {
      feeds.forEach((feed) => {
        newEntities[feed._id] = feed;
      });
    }

    state.entities = newEntities;
  },
  setActiveFeeds(state, { payload: feedIds }) {
    state.activeFeeds = feedIds;
  },
};

export function extraReducers(builder) {
  builder
    // fetchActiveFeeds
    .addCase(fetchActiveFeeds.pending, (state, _action) => {
      state.status = "loading";
    })
    .addCase(fetchActiveFeeds.fulfilled, (state, _action) => {
      state.status = "succeeded";
    })
    .addCase(fetchActiveFeeds.rejected, (state, _action) => {
      state.status = "failed";
    });
}
