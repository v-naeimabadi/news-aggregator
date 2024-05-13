import { addMilliseconds } from "date-fns";
import {
  formatInTimeZone as formatInTimeZoneBase,
  OptionsWithTZ,
} from "date-fns-tz";
import { parseWeekday } from "../internal/parse-weekday";
import { Weekday } from "../typings/weekday";
import { getTimeZoneOffset } from "./get-time-zone-offset";

export interface FormatDateTimeOptions
  extends Omit<OptionsWithTZ, "weekStartsOn"> {
  weekStartsOn?: Weekday;
}

export function formatDateTime(
  date: Date,
  format: string,
  timeZone: string,
  options?: FormatDateTimeOptions
): string {
  return formatInTimeZoneBase(
    addMilliseconds(date, getTimeZoneOffset(timeZone, date)),
    timeZone,
    format,
    {
      ...options,
      weekStartsOn: options?.weekStartsOn
        ? parseWeekday(options.weekStartsOn)
        : undefined,
    }
  );
}
