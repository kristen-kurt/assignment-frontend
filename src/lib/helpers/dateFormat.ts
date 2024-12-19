import { format } from "date-fns";

export default function dateFormat(date: string, formatStr?: string) {
  return format(date, formatStr || "PPP hh:mm a");
}
