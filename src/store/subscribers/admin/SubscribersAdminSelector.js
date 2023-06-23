export const selectAllSubscribers = (state, eventId) => {
  const { entities } = state.subscribersAdmin;

  if (entities && eventId) {
    return entities[eventId];
  }

  return [];
};
