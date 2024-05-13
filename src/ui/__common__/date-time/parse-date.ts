import { parseISO } from "date-fns";
import { isValidDateTime } from "./is-valid-date-time";

export function parseDate(date?: string | null | Date): Date | undefined {
  if (typeof date === "string") {
    const parsed = date ? parseISO(date) : undefined;
    if (isValidDateTime(parsed)) {
      return parsed;
    }
  } else if (isValidDateTime(date || undefined)) {
    return date as Date;
  }
  return undefined;
}
