import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface FilterState {
  handleChange: (value: string) => void;
  inputValue: string;
}

function paramsToObject(searchParams: URLSearchParams) {
  const result: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    result[key] = value;
  }
  return result;
}

export function useFilterQuery(id: string): FilterState {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const currentQuery = paramsToObject(searchParams);
  const query = useMemo(() => searchParams.get(id), [id, searchParams]);

  useEffect(() => {
    setInputValue(query ?? "");
  }, [query]);

  const handleDebounceChange = useCallback(
    (value: string) => {
      // removing query when search input is empty.
      if (value === "") {
        delete currentQuery[id];
        setSearchParams({ ...currentQuery });
      } else {
        setSearchParams({ ...currentQuery, [id]: value });
      }
    },
    [currentQuery, id, setSearchParams],
  );

  const handleChange = (value: string) => {
    setInputValue(value);
    handleDebounceChange(value);
  };

  return { handleChange, inputValue };
}
