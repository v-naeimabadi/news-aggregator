import { addMilliseconds, parseISO } from "date-fns";
import { formatInTimeZone, getTimezoneOffset } from "date-fns-tz";

export function getTimeZoneOffset(timeZone: string, date: Date): number {
  const offset = getTimezoneOffset(timeZone, date);
  return getTimezoneOffset(
    timeZone,
    addMilliseconds(
      parseISO(
        formatInTimeZone(date, timeZone, "yyyy-MM-dd") + "T00:00:00.000Z"
      ),
      offset * -1
    )
  );
}
