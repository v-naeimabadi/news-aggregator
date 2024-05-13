import { isValidDate } from "./is-valid-date";
import { isValidTime } from "./is-valid-time";

export function isValidDateTime(value?: unknown): boolean {
  if (!value || typeof value !== "object" || !(value instanceof Date))
    return false;
  if (typeof value.getMonth === "function") {
    let iso: string;
    try {
      iso = value.toISOString();
    } catch (err) {
      return false;
    }
    // Valid are: 2023-01-01T00:00:00.000Z (24)
    // or: 2023-01-01T00:00:00Z (20)
    if (iso.length !== 20 && iso.length !== 24) return false;
    if (!iso.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/))
      return false;
    if (!isValidDate(iso.slice(0, 10))) return false;
    if (!isValidTime(iso.slice(11, 19))) return false;
    return !isNaN(value as never);
  }
  return false;
}
