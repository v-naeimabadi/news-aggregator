export function formatName(
  firstName?: string | null,
  lastName?: string | null,
): string | undefined {
  firstName = firstName ? firstName.trim() : undefined;
  lastName = lastName ? lastName.trim() : undefined;
  if (firstName && lastName) return `${firstName} ${lastName}`;
  if (lastName) return lastName;
  if (firstName) return firstName;
  return undefined;
}
