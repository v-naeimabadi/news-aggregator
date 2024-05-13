import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SortOrder } from "../../../typings/sort-order";

function paramsToObject(searchParams: URLSearchParams) {
  const result: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    result[key] = value;
  }
  return result;
}

export interface SortState {
  toggleSort: (id: string, direction: "asc" | "desc" | null) => void;
  sortedField: string | null;
  sortOrder: "asc" | "desc" | null;
}

interface SortQueryProps {
  sortDefaultOrder?: SortOrder;
  cellKey: string;
}

export function useSortQuery({
  sortDefaultOrder,
  cellKey,
}: SortQueryProps): SortState {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortedField = useMemo(() => {
    return searchParams.get("sortBy");
  }, [searchParams]);

  const sortOrder = useMemo(() => {
    return searchParams.get("sortBy") === cellKey
      ? (searchParams.get("direction") as "asc" | "desc")
      : null;
  }, [cellKey, searchParams]);

  const toggleSort = useCallback(
    (id: string, direction: "asc" | "desc" | null) => {
      if (id && direction) {
        setSearchParams({
          ...paramsToObject(searchParams),
          sortBy: id,
          direction: direction.toLowerCase(),
        });
      } else {
        searchParams.delete(id);
        setSearchParams(searchParams);
      }
    },
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    if (sortDefaultOrder) {
      toggleSort(cellKey, sortDefaultOrder === SortOrder.Asc ? "asc" : "desc");
    }
  }, [cellKey, sortDefaultOrder, toggleSort]);

  return { toggleSort, sortedField, sortOrder };
}
