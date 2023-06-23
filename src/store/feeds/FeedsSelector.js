export const selectActiveFeeds = (state) => {
  const { entities, activeFeeds } = state.feeds;
  if (!entities || !activeFeeds || !activeFeeds.length) return [];
  const feeds = [];

  activeFeeds.forEach((feedId) => {
    feeds.push(entities[feedId]);
  });

  return feeds;
};
