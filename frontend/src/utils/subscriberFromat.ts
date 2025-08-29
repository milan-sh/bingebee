export function formatSubscribersCount(count=0) {
  if (count < 2) {
    return `${count} subscriber`;
  }
  return `${count} subscribers`;
}
