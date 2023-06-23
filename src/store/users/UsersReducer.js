import { MDBToast } from "mdbreact";

// thunk imports
import { fetchProfile, updateProfile } from "./UsersThunk";

// service imports
import authService from "../../services/authService";
import usersService from "../../services/usersService";

const currentUser = authService.loginWithJwt();

export const initialState = {
  entities: currentUser ? { [currentUser._id]: feedMetaInfo(currentUser) } : {},
  status: "idle",
};

export const reducers = {
  add(state, { payload: user }) {
    if (user) {
      state.entities = { ...state.entities, [user._id]: feedMetaInfo(user) };
    }
  },
  bulkAdd(state, { payload: users }) {
    const newEntities = { ...state.entities };

    if (users) {
      users.forEach((user) => {
        newEntities[user._id] = feedMetaInfo(user);
      });
    }

    state.entities = newEntities;
  },
  update(state, { payload: user }) {
    if (user)
      state.entities = { ...state.entities, [user._id]: feedMetaInfo(user) };
  },
};

export function extraReducers(builder) {
  builder
    // fetchProfile
    .addCase(fetchProfile.pending, (state, _action) => {
      state.status = "loading";
    })
    .addCase(fetchProfile.fulfilled, (state, _action) => {
      state.status = "succeeded";
    })
    .addCase(fetchProfile.rejected, (state, _action) => {
      state.status = "failed";
    })

    // updateProfile
    .addCase(updateProfile.pending, (state, _action) => {
      state.status = "loading";
    })
    .addCase(updateProfile.fulfilled, (state, _action) => {
      state.status = "succeeded";
      MDBToast.success("Profile updated successfully.");
    })
    .addCase(updateProfile.rejected, (state, _action) => {
      state.status = "failed";
      MDBToast.error("Unable to update.");
    });
}

function feedMetaInfo(user) {
  if (!user) return null;
  user.fullName = usersService.getFullName(user);
  user.isHof = user.itsNumber === user.hofItsNumber;
  return user;
}
