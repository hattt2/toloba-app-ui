import { combineReducers } from "redux";

// reducer imports
import authReducer from "./auth/AuthSlice";
import usersReducer from "./users/UsersSlice";
import usersAdminReducer from "./users/admin/UsersAdminSlice";
import eventsReducer from "./events/EventsSlice";
import eventsAdminReducer from "./events/admin/EventsAdminSlice";
import subscribersAdminReducer from "./subscribers/admin/SubscribersAdminSlice";
import feedsReducer from "./feeds/FeedsSlice";
import loadingReducer from "./LoadingSlice";
import jamaatsReducer from "./jamaats/JamaatsSlice";

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  auth: authReducer,
  users: usersReducer,
  usersAdmin: usersAdminReducer,
  events: eventsReducer,
  eventsAdmin: eventsAdminReducer,
  subscribersAdmin: subscribersAdminReducer,
  feeds: feedsReducer,
  loading: loadingReducer,
  jamaats: jamaatsReducer,
});

export default rootReducer;
