export default function trim(text?: string, count?: number) {
  if (!text) return "-";
  const trimCount = count ?? 30;
  return text.length > trimCount ? text.substring(0, trimCount) + "..." : text;
}
