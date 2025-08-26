export function formatSubscribersCount(count: number):string {
  if (count < 2) {
    return `${count} subscriber`;
  }
  return `${count} subscribers`;
}
