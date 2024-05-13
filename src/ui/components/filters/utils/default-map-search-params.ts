export function defaultMapSearchParams<T, Filters = {}>(filters: Filters): T {
  const returnValue: Partial<Filters> = {};
  for (const prop in filters) {
    if (Object.prototype.hasOwnProperty.call(filters, prop)) {
      if (filters[prop] instanceof Date) {
        returnValue[prop] = (filters[prop] as Date).toISOString() as never;
      } else {
        returnValue[prop] = filters[prop];
      }
    }
  }
  return returnValue as unknown as T;
}
