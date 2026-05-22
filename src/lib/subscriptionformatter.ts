export function formatSubscribersCount(count: number): string {
  if (count === 0) return "No subscriber";
  if (count < 1000) return count.toString() + " subscribers";
  if (count < 1000000) return (count / 1000).toFixed(1) + "K subscribers";
  if (count < 1000000000) return (count / 1000000).toFixed(1) + "M subscribers";
  return (count / 1000000000).toFixed(1) + "B subscribers";
}
