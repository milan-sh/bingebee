export function formatCommentLength(length: number) {
  if (length === 0) return "No comments";
  if (length === 1) return "1 comment";
  return `${length} comments`;
}
