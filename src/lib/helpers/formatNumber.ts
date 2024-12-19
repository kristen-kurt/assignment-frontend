export default function formatNumber(number?: number): string {
  return number ? number.toLocaleString() : "0";
}
