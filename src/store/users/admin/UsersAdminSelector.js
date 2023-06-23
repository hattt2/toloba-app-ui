// plugin imports
import * as _ from "lodash";

// selector imports
import { selectRoles, selectCurrentUser } from "../../auth/AuthSelector";

export const selectUsersByHofIts = (state, hofIts) => {
  const { entities } = state.users;
  let members = [];
  let hof = null;

  if (hofIts) {
    Object.keys(entities).forEach((userId) => {
      const member = entities[userId];
      if (hofIts !== member.hofItsNumber) return;

      if (member.isHof) {
        hof = member;
      } else {
        members.push(member);
      }
    });

    members = _.orderBy(members, ["age"], ["desc"]);
  }

  return { hof, members };
};

export const selectAdmins = (state) => {
  const { entities } = state.users;
  const { adminIds } = state.usersAdmin;
  const users = [];

  if (entities && adminIds && adminIds.length) {
    Object.keys(entities).forEach((userId) => {
      const user = entities[userId];
      if (!adminIds.includes(user._id)) return;
      users.push(user);
    });
  }

  return _.orderBy(users, ["updatedAt"], ["desc"]);
};

export const hasAdminAccess = (state, _user) => {
  const user = _user || selectCurrentUser(state);
  if (!user) return false;
  if (user.superAdmin) return true;
  if (!user.roles || !Object.keys(user.roles).length) return false;
  let hasAccess = false;

  Object.keys(user.roles).forEach((module) => {
    if (user.roles[module]) hasAccess = true;
  });

  return hasAccess;
};

export const hasSuperAdminAccess = (state, _user) => {
  const user = _user || selectCurrentUser(state);
  return user && user.superAdmin;
};

export const hasPermissionForResource = (
  state,
  resource,
  permission,
  _user
) => {
  const user = _user || selectCurrentUser(state);
  const roles = selectRoles(state);
  if (!roles || !Object.keys(roles).length || !user) return false;
  if (user.superAdmin) return true;
  const resourceRoles = roles[resource];
  const rolePermissions = resourceRoles[user.roles[resource]];
  return rolePermissions ? rolePermissions.includes(permission) : false;
};
