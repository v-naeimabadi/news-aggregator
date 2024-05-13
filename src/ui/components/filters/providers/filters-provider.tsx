import {
  Dispatch,
  PropsWithChildren,
  ReactElement,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { FiltersContext } from "../contexts/filters-context";
import { SetFiltersContext } from "../contexts/set-filters-context";
import { defaultMapFilters } from "../utils/default-map-filters";
import { defaultMapSearchParams } from "../utils/default-map-search-params";
import { getSearchParams } from "../utils/get-search-params";
import { replaceSearchParams } from "../utils/replace-search-params";

export interface FiltersProviderProps<Filters = {}> extends PropsWithChildren {
  defaultFilters?: Filters;
  mapFilters?: (queryString: never) => Filters;
  mapSearchParams?: (filters: Filters) => Record<string, unknown>;
  onSetFilters?: (filters: Filters) => void;
}

export function FiltersProvider<Filters = {}>({
  children,
  defaultFilters,
  mapFilters = defaultMapFilters,
  mapSearchParams = defaultMapSearchParams,
  onSetFilters,
}: FiltersProviderProps<Filters>): ReactElement | null {
  const [filtersState, setFiltersState] = useState(
    () =>
      ({
        ...defaultFilters,
        ...mapFilters({
          ...(defaultFilters ? mapSearchParams(defaultFilters) : {}),
          ...getSearchParams(),
        } as never),
      } as Filters),
  );

  const setFilters = useCallback<Dispatch<SetStateAction<Filters>>>(
    (value) => {
      if (value && typeof value === "function") {
        setFiltersState((prev) => {
          const next = (value as (prevState: Filters) => Filters)(prev);
          replaceSearchParams(mapSearchParams(next));
          if (onSetFilters) onSetFilters(next);
          return next;
        });
      } else {
        replaceSearchParams(mapSearchParams(value));
        setFiltersState(value);
        if (onSetFilters) onSetFilters(value);
      }
    },
    [mapSearchParams, onSetFilters],
  );

  return (
    <SetFiltersContext.Provider
      value={setFilters as Dispatch<SetStateAction<unknown>>}
    >
      <FiltersContext.Provider value={filtersState}>
        {children}
      </FiltersContext.Provider>
    </SetFiltersContext.Provider>
  );
}
