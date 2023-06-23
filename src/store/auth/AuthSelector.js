export const selectCurrentUser = (state) => {
  const { entities } = state.users;
  const { currentUserId } = state.auth;
  if (entities && currentUserId) return entities[currentUserId];
  return null;
};

export const selectRoles = (state) => {
  return state.auth.roles;
};
