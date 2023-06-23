import { MDBToast } from "mdbreact";

// thunk imports
import { logout, login } from "./AuthThunk";

// service imports
import authService from "../../services/authService";

const currentUser = authService.loginWithJwt();

export const initialState = {
  currentUserId: currentUser ? currentUser._id : null,
  roles: null,
  status: "idle",
};

export const reducers = {
  setCurrentUserId(state, { payload: userId }) {
    state.currentUserId = userId;
  },
  setRoles(state, { payload: roles }) {
    state.roles = roles;
  },
};

export function extraReducers(builder) {
  builder
    // login
    .addCase(login.pending, (state, _action) => {
      state.status = "loading";
    })
    .addCase(login.fulfilled, (state, _action) => {
      state.status = "succeeded";
    })
    .addCase(login.rejected, (state, action) => {
      state.status = "failed";
      MDBToast.error("Unable to login.");
    })

    // logout
    .addCase(logout.pending, (state, _action) => {
      state.status = "loading";
    })
    .addCase(logout.fulfilled, (state, _action) => {
      state.status = "succeeded";
      window.location = `/?redirect_to=${window.location.href}`;
    })
    .addCase(logout.rejected, (state, _action) => {
      state.status = "failed";
    });
}
