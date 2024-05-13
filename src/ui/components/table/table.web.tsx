import styled from "styled-components";
import {
  ForwardedRef,
  forwardRef,
  ReactElement,
  useRef,
  useCallback,
} from "react";
import { ActivityIndicator } from "../activity-indicator/activity-indicator.web";
import { useFilterQuery } from "./hooks/use-filter-query";
import { TableProps } from "./table";
import { TablePagination } from "./components/table-pagination";

function RefForwardingTable(
  {
    children,
    hasNextPage = false,
    data = false,
    endCursor,
    loading = false,
    pagination = false,
    totalPages,
    ...props
  }: Omit<TableProps, "ref">,
  ref?: ForwardedRef<HTMLTableElement>,
): ReactElement | null {
  const observer = useRef<IntersectionObserver | null>(null);
  const { handleChange } = useFilterQuery("scroll");

  const lastRowElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current?.disconnect();
      if (data) {
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasNextPage && endCursor) {
            handleChange("true");
          }
        });
      }
      if (node && observer.current) observer.current.observe(node);
    },
    [loading, data, hasNextPage, endCursor, handleChange],
  );
  return (
    <>
      <TableContainer ref={ref} {...props}>
        {children}
      </TableContainer>
      {hasNextPage ? (
        <ActivityIndicatorContainer ref={lastRowElementRef}>
          <ActivityIndicator size={16} />
        </ActivityIndicatorContainer>
      ) : null}
      {pagination ? <TablePagination totalPages={totalPages} /> : null}
    </>
  );
}

const TableContainer = styled("table")`
  border-collapse: collapse;
  min-width: 1260px;
  table-layout: fixed;
  width: 100%;

  td {
    white-space: nowrap;
  }
`;

const ActivityIndicatorContainer = styled("div")`
  background-color: white;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const Table = forwardRef(RefForwardingTable);
