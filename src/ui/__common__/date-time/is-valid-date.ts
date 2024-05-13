export function isValidDate(value?: unknown): boolean {
  if (!value || typeof value !== "string" || value.length !== 10) return false;
  const parts = value.split("-");
  if (parts.length !== 3) return false;
  const years = parseInt(parts[0]);
  const months = parseInt(parts[1]);
  const days = parseInt(parts[2]);
  if (years < 0 || years > 9999) return false;
  if (months < 1 || months > 12) return false;
  if (days < 1 || days > 31) return false;
  return true;
}
