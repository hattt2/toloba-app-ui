import * as _ from "lodash";

export const selectAllEvents = (state) => {
  const { entities } = state.events;
  let events = [];

  if (entities) {
    Object.keys(entities).forEach((eventId) => {
      events.push(entities[eventId]);
    });
  }

  events = _.orderBy(events, ["active", "title"], ["desc", "asc"]);
  return events;
};

export const selectEventById = (state, eventId) => {
  const { entities } = state.events;

  if (entities) {
    return entities[eventId];
  }
};
