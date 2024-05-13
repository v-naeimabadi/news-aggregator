export function isValidTime(value?: unknown): boolean {
  if (!value || typeof value !== "string" || value.length !== 8) return false;
  const parts = value.split(":");
  if (parts.length !== 3) return false;
  const hours = parseInt(parts[0]);
  const minutes = parseInt(parts[1]);
  const seconds = parseInt(parts[2]);
  if (hours < 0 || hours > 23) return false;
  if (minutes < 0 || minutes > 59) return false;
  if (seconds < 0 || seconds > 59) return false;
  return true;
}
