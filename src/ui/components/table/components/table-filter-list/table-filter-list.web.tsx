import {
  ReactElement,
  ForwardedRef,
  forwardRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { Button } from "../../../button/button.web";
import { TableFilter } from "./components/table-filter";
import { TableFilterListProps } from "./table-filter-list";

function RefForwardingTableFilterList(
  {
    filterList,
    filterOptions,
    disabled,
    ...props
  }: Omit<TableFilterListProps, "ref">,
  ref?: ForwardedRef<HTMLDivElement>
): ReactElement | null {
  const [values, setValues] = useState<string[]>(
    filterList.filter((item) => item.selected).map((item) => item.id)
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const filterListRef = useRef(filterList);

  const searchFilter = useMemo(() => {
    return filterListRef.current.find((item) => item.type === "search");
  }, []);

  const currentFilterList = useMemo(() => {
    return filterList.filter((filter) => {
      if (values.includes(filter.id)) {
        return filter;
      }
      return null;
    });
  }, [filterList, values]);

  const showClearFilterButton = useMemo(() => {
    let result = false;
    currentFilterList.forEach((item) => {
      if (searchParams.has(item.id)) {
        result = true;
      }
    });
    if (searchParams.has(searchFilter?.id as string)) {
      result = true;
    }
    return result;
  }, [currentFilterList, searchFilter?.id, searchParams]);

  const clearFilter = useCallback(() => {
    values.forEach((value) => {
      searchParams.delete(value);
    });
    searchParams.delete(searchFilter?.id as string);
    searchParams.delete("startDate");
    searchParams.delete("endDate");
    setSearchParams(searchParams);
  }, [searchFilter?.id, searchParams, setSearchParams, values]);

  useEffect(() => {
    filterList.forEach((filter) => {
      if (filter.type !== "search" && !values.includes(filter.id)) {
        searchParams.delete(filter.id);
        if (filter.type === "date" && filter.dateInputType === "range") {
          searchParams.delete("startDate");
          searchParams.delete("endDate");
        }
      }
    });
    setSearchParams(searchParams);
  }, [
    filterList,
    filterList.length,
    searchParams,
    setSearchParams,
    values,
    values.length,
  ]);

  return (
    <TableFilterListContainer ref={ref} {...props}>
      {/* Search Box */}

      {filterOptions && filterOptions?.length > 0 ? (
        <>
          {currentFilterList &&
            currentFilterList.map((filter, index) => (
              <TableFilter
                key={index}
                label={filter.label}
                placeholder={filter.placeholder}
                type={filter.type}
                id={filter.id}
                format={filter.format}
                dateInputType={filter.dateInputType}
              />
            ))}

          {showClearFilterButton ? (
            <Box onClick={clearFilter}>
              <Button color="red" variant="text" glyph="filter-clear">
                Clear filters
              </Button>
            </Box>
          ) : null}
        </>
      ) : null}
    </TableFilterListContainer>
  );
}

const TableFilterListContainer = styled("div")`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Box = styled("div")`
  button {
    font-size: 11px;
    > div {
      margin-right: 4px !important;
    }
  }
`;

const FilterButton = styled(Button)`
  svg * {
    fill: ${({ theme }) => "#808080"};
  }
  color: ${({ theme }) => "#808080"};
`;

export const TableFilterList = forwardRef(RefForwardingTableFilterList);
