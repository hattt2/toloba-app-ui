import { MDBToast } from "mdbreact";

// thunk imports
import { fetchEvents, updateEvent } from "./EventsAdminThunk";

export const initialState = {
  status: "idle",
};

export const reducers = {
  //
};

export function extraReducers(builder) {
  builder
    // fetchEvents
    .addCase(fetchEvents.pending, (state, _action) => {
      state.status = "loading";
    })
    .addCase(fetchEvents.fulfilled, (state, _action) => {
      state.status = "succeeded";
    })
    .addCase(fetchEvents.rejected, (state, _action) => {
      state.status = "failed";
      MDBToast.error("Unable to fetch events.");
    })
    // update
    .addCase(updateEvent.pending, (state, _action) => {
      state.status = "loading";
    })
    .addCase(updateEvent.fulfilled, (state, _action) => {
      state.status = "succeeded";
    })
    .addCase(updateEvent.rejected, (state, _action) => {
      state.status = "failed";
      MDBToast.error("Unable to update.");
    });
}
