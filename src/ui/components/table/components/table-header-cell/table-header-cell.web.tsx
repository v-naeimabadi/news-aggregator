import styled from "styled-components";
import {
  ForwardedRef,
  forwardRef,
  ReactElement,
  useCallback,
  useEffect,
} from "react";
import { useSortQuery } from "../../hooks/use-sort-query";
import { TableHeaderCellProps } from "./table-header-cell";

function RefForwardingTableHeaderCell(
  {
    children,
    cellKey,
    minWidth,
    width,
    maxWidth,
    textAlign = "left",
    sortable,
    sortDefaultOrder,
    colspan,
    ...props
  }: Omit<TableHeaderCellProps, "ref">,
  ref?: ForwardedRef<HTMLTableCellElement>,
): ReactElement | null {
  const { toggleSort, sortedField, sortOrder } = useSortQuery({
    sortDefaultOrder,
    cellKey,
  });

  useEffect(() => {
    if (sortOrder && sortedField && sortedField !== cellKey) {
      toggleSort(cellKey, null);
    } else if (sortedField === cellKey) {
      toggleSort(cellKey, sortOrder || "asc");
    }
  }, [cellKey, sortOrder, sortedField, toggleSort]);

  const handleHeaderRowClick = useCallback(() => {
    if (sortable) {
      if (!sortOrder || sortOrder === "desc") {
        toggleSort(cellKey, "asc");
      } else {
        toggleSort(cellKey, "desc");
      }
    }
  }, [cellKey, sortOrder, sortable, toggleSort]);

  return (
    <TableHeaderCellContainer
      role={sortable ? "button" : "cell"}
      key={cellKey}
      minWidth={minWidth}
      width={width}
      maxWidth={maxWidth}
      textAlign={textAlign}
      sortable={sortable}
      ref={ref}
      colSpan={colspan}
      sortOder={sortOrder}
      onClick={handleHeaderRowClick}
      typeofChildren={typeof children}
      {...props}
    >
      <Container>
        {children}
        {sortable ? (
          <span aria-label="sort-icon" role="img">
            ⬇️
          </span>
        ) : null}
      </Container>
    </TableHeaderCellContainer>
  );
}
const Container = styled("div")`
  align-items: center;
  display: flex;
`;
const TableHeaderCellContainer = styled("th").withConfig<{
  minWidth?: TableHeaderCellProps["minWidth"];
  maxWidth?: TableHeaderCellProps["maxWidth"];
  width?: TableHeaderCellProps["width"];
  textAlign?: TableHeaderCellProps["textAlign"];
  sortable?: boolean;
  sortOder?: string | null;
  typeofChildren?: string;
}>({
  shouldForwardProp: (prop) =>
    prop !== "minWidth" &&
    prop !== "maxWidth" &&
    prop !== "sortable" &&
    prop !== "width" &&
    prop !== "textAlign" &&
    prop !== "typeofChildren" &&
    prop !== "sortOder",
})`
  justify-content: ${({ textAlign }) =>
    textAlign === "center"
      ? "center"
      : textAlign === "left"
      ? "flex-start"
      : "flex-end"};
  position: relative;
  gap: 0px 14px;
  align-items: center;
  color: ${({ theme }) => "#A9A9A9"};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0px;
  margin: 0;

  max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : "inherit")};
  width: ${({ width }) => (width ? `${width}px` : "inherit")};
  min-width: ${({ minWidth }) => (minWidth ? `${minWidth}px` : "inherit")};

  text-align: ${({ textAlign }) => textAlign};
  cursor: ${({ sortable }) => (sortable ? "pointer" : "auto")};
  &:first-of-type {
    padding-left: 16px;
  }
  &:hover {
    color: ${({ theme }) => "#A9A9A9"};
  }
  &:active {
    color: ${({ theme }) => "#A9A9A9"};
  }
  &:hover span {
    display: inline;
  }
  span {
    margin-left: 8px;
    display: ${({ sortOder }) => (!sortOder ? "none" : "inline")};
    margin-left: ${({ typeofChildren }) =>
      typeofChildren === "object" ? "-12px" : null};
    transform: ${({ sortOder }) =>
      sortOder === "asc"
        ? "rotate(360deg)"
        : sortOder === "desc"
        ? "rotate(180deg)"
        : null};
  }
  &:last-of-type {
    width: 100%;
  }
`;

export const TableHeaderCell = forwardRef(RefForwardingTableHeaderCell);
