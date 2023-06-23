export const selectAllFeeds = (state) => {
  const { entities } = state.feeds;
  const feeds = [];

  if (entities) {
    Object.keys(entities).forEach((feedId) => {
      feeds.push(entities[feedId]);
    });
  }

  return feeds;
};
