import { sortBy } from "lodash";

export const selectJamaats = (state) => {
  const { entities } = state.jamaats;
  const jamaats = [];

  Object.keys(entities || {}).forEach((id) => {
    jamaats.push(entities[id]);
  });

  return sortBy(jamaats, "fields.displayName");
};

export const selectJamaatById = (state, id) => {
  const { entities } = state.jamaats;
  return entities[id];
};
