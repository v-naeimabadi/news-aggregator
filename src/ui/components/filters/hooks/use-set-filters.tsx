import { Dispatch, SetStateAction, useContext } from "react";
import { SetFiltersContext } from "../contexts/set-filters-context";

export function useSetFilters<Filters>(): Dispatch<SetStateAction<Filters>> {
  const context = useContext(SetFiltersContext);
  if (!context)
    throw new Error("Cannot use useSetFilters outside of SetFiltersContext");
  return context;
}
