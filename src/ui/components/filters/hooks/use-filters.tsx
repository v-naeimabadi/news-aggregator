import { useContext } from "react";
import { FiltersContext } from "../contexts/filters-context";

export function useFilters<Filters>(): Filters {
  const context = useContext(FiltersContext);
  if (!context)
    throw new Error("Cannot use useFilters outside of FiltersContext");
  return context as Filters;
}
