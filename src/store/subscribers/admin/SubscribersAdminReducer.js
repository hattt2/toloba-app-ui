import { MDBToast } from "mdbreact";

// thunk imports
import {
  fetchSubscribers,
  bulkAddSubscribers,
  bulkRemoveSubscribers,
  updateSubscriber,
} from "./SubscribersAdminThunk";

// service imports
import usersService from "../../../services/usersService";

export const initialState = {
  entities: {},
  status: "idle",
};

export const reducers = {
  bulkAdd(state, { payload }) {
    const { eventId, subscribers } = payload;
    const newEntities = { ...state.entities };

    if (eventId) {
      subscribers.forEach(
        (subscriber) => (subscriber.user = feedMetaInfo(subscriber.user))
      );

      newEntities[eventId] = subscribers;
    }

    state.entities = newEntities;
  },
};

export function extraReducers(builder) {
  builder
    // fetchSubscribers
    .addCase(fetchSubscribers.pending, (state, _action) => {
      state.status = "loading";
    })
    .addCase(fetchSubscribers.fulfilled, (state, _action) => {
      state.status = "succeeded";
    })
    .addCase(fetchSubscribers.rejected, (state, _action) => {
      state.status = "failed";
      MDBToast.error("Unable to fetch subscribers.");
    })

    // updateSubscriber
    .addCase(updateSubscriber.pending, (state, _action) => {
      state.status = "loading";
    })
    .addCase(updateSubscriber.fulfilled, (state, _action) => {
      state.status = "succeeded";
      MDBToast.success("Subscriber updated successfully.");
    })
    .addCase(updateSubscriber.rejected, (state, _action) => {
      state.status = "failed";
      MDBToast.error("Unable to update subscriber");
    })

    // bulkAddSubscribers
    .addCase(bulkAddSubscribers.pending, (state, _action) => {
      state.status = "loading";
    })
    .addCase(bulkAddSubscribers.fulfilled, (state, _action) => {
      state.status = "succeeded";
      MDBToast.success("Subscribers added successfully.");
    })
    .addCase(bulkAddSubscribers.rejected, (state, _action) => {
      state.status = "failed";
      MDBToast.error("Unable to add subscribers - Invalid ITS Numbers present");
    })

    // bulkRemoveSubscribers
    .addCase(bulkRemoveSubscribers.pending, (state, _action) => {
      state.status = "loading";
    })
    .addCase(bulkRemoveSubscribers.fulfilled, (state, _action) => {
      state.status = "succeeded";
      MDBToast.success("Subscribers removed successfully.");
    })
    .addCase(bulkRemoveSubscribers.rejected, (state, _action) => {
      state.status = "failed";
      MDBToast.error("Unable to remove subscribers.");
    });
}

function feedMetaInfo(user) {
  if (!user) return null;
  user.fullName = usersService.getFullName(user);
  user.isHof = user.itsNumber === user.hofItsNumber;
  return user;
}
