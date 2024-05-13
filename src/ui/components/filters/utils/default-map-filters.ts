export function defaultMapFilters<T, Filters = {}>(queryString: T): Filters {
  const returnValue: Partial<T> = {};
  for (const prop in queryString) {
    if (Object.prototype.hasOwnProperty.call(queryString, prop)) {
      returnValue[prop] = queryString[prop];
    }
  }
  return returnValue as unknown as Filters;
}
