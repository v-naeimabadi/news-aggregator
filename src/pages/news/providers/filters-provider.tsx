import { PropsWithChildren, ReactElement, useCallback, useMemo } from "react";
import { createDate, formatDateTime } from "../../../ui/__common__";
import { Filters } from "../typings/filters";
import { FiltersProvider as FiltersProviderBase } from "../../../ui/components/filters";
import { useTimeZone } from "../../../hooks/use-time-zone";


export function FiltersProvider({
  children,
}: PropsWithChildren): ReactElement | null {
  const timeZone = useTimeZone();
  const defaultFilters = useMemo(
    (): Filters => ({
      date: undefined,
    }),
    []
  );

  const mapFilters = useCallback(
    (searchParams: Omit<Filters, "date"> & { date?: string }): Filters => {
      return {
        ...searchParams,
        date: searchParams.date
          ? createDate(searchParams.date, timeZone)
          : undefined,
      };
    },
    [timeZone]
  );

  const mapSearchParams = useCallback(
    (filters: Filters) => ({
      ...filters,
      date: filters.date
        ? formatDateTime(filters.date, "yyyy-MM-dd", timeZone)
        : undefined,
    }),
    [timeZone]
  );

  return (
    <FiltersProviderBase<Filters>
      defaultFilters={defaultFilters}
      mapFilters={mapFilters}
      mapSearchParams={mapSearchParams}
      onSetFilters={(_filters) => {}}
    >
      {children}
    </FiltersProviderBase>
  );
}
