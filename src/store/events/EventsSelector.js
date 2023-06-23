export const selectAccessibleEvents = (state) => {
  const { entities, accessibleEvents } = state.events;
  if (!entities || !accessibleEvents || !accessibleEvents.length) return [];
  const events = [];

  accessibleEvents.forEach((eventId) => {
    events.push(entities[eventId]);
  });

  return events;
};

export const selectEventById = (state, eventId) => {
  const { entities } = state.events;
  return entities[eventId];
};
