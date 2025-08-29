export function formatSubscribersCount(count=0) {
  if (count === 0) {
    return `No Subscribers`;
  }
  if (count < 2) {
    return `${count} Subscriber`;
  }
  return `${count} Subscribers`;
}


export function formatSubscribedChannelsCount(count=0) {
  if (count === 0) {
    return `No Subscribed Channels`;
  }
  return `${count} Subscribed`;
}
