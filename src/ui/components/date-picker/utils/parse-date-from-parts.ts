import { isValid } from "date-fns";

export function parseDateFromParts(
  year: string,
  month: string,
  day: string,
): Date | null {
  if (month === "" || day === "" || year === "" || year.length !== 4) {
    return null;
  }
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  if (isValid(date)) {
    return date;
  }
  return null;
}
