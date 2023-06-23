export const selectUserById = (state, id) => {
  const { entities } = state.users;
  if (entities && id) return entities[id];
  return null;
};
