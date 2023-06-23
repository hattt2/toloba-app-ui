import { MDBToast } from "mdbreact";

// thunk imports
import { fetchJamaats } from "./JamaatsThunk";

export const initialState = {
  entities: {},
  status: "idle",
};

export const reducers = {
  bulkAdd(state, { payload: jamaats }) {
    const newEntities = { ...state.entities };

    if (jamaats) {
      jamaats.forEach((jamaat) => {
        newEntities[jamaat.id] = jamaat;
      });
    }

    state.entities = newEntities;
  },
};

export function extraReducers(builder) {
  builder
    // fetchJamaats
    .addCase(fetchJamaats.pending, (state, _action) => {
      state.status = "loading";
    })
    .addCase(fetchJamaats.fulfilled, (state, _action) => {
      state.status = "succeeded";
    })
    .addCase(fetchJamaats.rejected, (state, _action) => {
      state.status = "failed";
      MDBToast.error("Unable to fetch jamaats.");
    });
}
