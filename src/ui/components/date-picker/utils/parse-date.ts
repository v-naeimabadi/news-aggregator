import { splitDateString } from "./split-date-string";
import { parseDateFromParts } from "./parse-date-from-parts";

export function parseDate(
  value: string,
  format: "mm/dd/yyyy" | "yyyy-mm-dd",
): Date | null {
  const [year, month, day] = splitDateString(value, format);
  return parseDateFromParts(year, month, day);
}
