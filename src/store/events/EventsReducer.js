import { MDBToast } from "mdbreact";

// thunk imports
import { fetchAccessibleEvents, fetchEventById } from "./EventsThunk";

export const initialState = {
  entities: {},
  accessibleEvents: [],
  status: "idle",
};

export const reducers = {
  add(state, { payload: event }) {
    if (event) {
      state.entities = { ...state.entities, [event._id]: event };
    }
  },
  bulkAdd(state, { payload: events }) {
    const newEntities = { ...state.entities };

    if (events) {
      events.forEach((event) => {
        newEntities[event._id] = event;
      });
    }

    state.entities = newEntities;
  },
  setAccessibleEvents(state, { payload: eventIds }) {
    state.accessibleEvents = eventIds;
  },
  update(state, { payload: event }) {
    if (event) state.entities = { ...state.entities, [event._id]: event };
  },
  remove(state, { payload: eventId }) {
    if (!eventId) return;
    const newEntities = { ...state.entities };
    delete newEntities[eventId];
    state.entities = newEntities;
  },
};

export function extraReducers(builder) {
  builder
    // fetchAccessibleEvents
    .addCase(fetchAccessibleEvents.pending, (state, _action) => {
      state.status = "loading";
    })
    .addCase(fetchAccessibleEvents.fulfilled, (state, _action) => {
      state.status = "succeeded";
    })
    .addCase(fetchAccessibleEvents.rejected, (state, _action) => {
      state.status = "failed";
      MDBToast.error("Unable to fetch events.");
    })

    // fetchEventById
    .addCase(fetchEventById.pending, (state, _action) => {
      state.status = "loading";
    })
    .addCase(fetchEventById.fulfilled, (state, _action) => {
      state.status = "succeeded";
    })
    .addCase(fetchEventById.rejected, (state, _action) => {
      state.status = "failed";
      MDBToast.error("Unable to fetch event details");
    });
}
