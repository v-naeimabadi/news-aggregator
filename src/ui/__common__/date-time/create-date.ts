import { subMilliseconds } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import { getTimeZoneOffset } from "./get-time-zone-offset";

/**
 * Usually, in JavaScript, the month argument is a number from 0 to 11, this is confusing so for the functions in our
 * common library, we use the real month number from 1 to 12.
 */
export function createDate(
  year: number,
  month: number,
  day: number,
  timeZone: string
): Date;
export function createDate(str: string, timeZone: string): Date;
export function createDate(
  yearOrStr: number | string,
  monthOrTimeZone: number | string,
  day?: number | undefined,
  timeZone?: string | undefined
): Date {
  if (
    typeof yearOrStr === "number" &&
    typeof monthOrTimeZone === "number" &&
    typeof day === "number" &&
    typeof timeZone === "string"
  ) {
    const year = yearOrStr;
    const month = monthOrTimeZone - 1;
    if (month < 0 || month > 11)
      throw new Error(
        `Invalid month ${monthOrTimeZone}, you should be using the real month number between 1 and 12`
      );
    const date = zonedTimeToUtc(new Date(year, month, day), "UTC");
    const offset = getTimeZoneOffset(timeZone, date);

    return subMilliseconds(
      date,
      getTimeZoneOffset(timeZone, subMilliseconds(date, offset))
    );
  } else if (
    typeof yearOrStr === "string" &&
    typeof monthOrTimeZone === "string"
  ) {
    const str = yearOrStr;

    if (str.length !== 10 || !str.match(/^\d{4}-\d{2}-\d{2}$/)) {
      throw new Error("invalid date string " + str);
    }

    const date = zonedTimeToUtc(
      new Date(
        parseInt(str.slice(0, 4)),
        parseInt(str.slice(5, 7)) - 1,
        parseInt(str.slice(8, 10))
      ),
      "UTC"
    );

    const offset = getTimeZoneOffset(monthOrTimeZone, date);
    return subMilliseconds(
      date,
      getTimeZoneOffset(monthOrTimeZone, subMilliseconds(date, offset))
    );
  }

  throw new Error(
    `incorrect parameters for changeDate (yearOrStr: ${typeof yearOrStr}, monthOrTimeZone: ${typeof monthOrTimeZone}, day: ${typeof day}, timeZone: ${typeof timeZone})`
  );
}
