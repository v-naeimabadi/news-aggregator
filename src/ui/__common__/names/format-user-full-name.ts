interface User {
  firstname?: string | null;
  lastname?: string | null;
}

export function formatUserFullName(
  user?: User | null | undefined,
): string | null {
  if (!user) return null;
  if (typeof user.firstname !== "string" && typeof user.lastname !== "string")
    return null;
  if (user.firstname && user.lastname)
    return user.firstname + " " + user.lastname;
  if (user.firstname) return user.firstname;
  if (user.lastname) return user.lastname;
  return null;
}
