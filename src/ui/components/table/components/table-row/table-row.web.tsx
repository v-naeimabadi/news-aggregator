import styled from "styled-components";
import { ForwardedRef, forwardRef, ReactElement } from "react";
import { TableRowProps } from "./table-row";

function RefForwardingTableRow(
  { children, type = "td", ...props }: Omit<TableRowProps, "ref">,
  ref?: ForwardedRef<HTMLTableRowElement>,
): ReactElement | null {
  if (type === "th") {
    return (
      <TableHeaderRowContainer ref={ref} {...props}>
        {children}
      </TableHeaderRowContainer>
    );
  } else if (type === "section") {
    return (
      <TableSectionRowContainer ref={ref} {...props}>
        {children}
      </TableSectionRowContainer>
    );
  }
  return (
    <TableRowContainer ref={ref} {...props}>
      {children}
    </TableRowContainer>
  );
}

const TableHeaderRowContainer = styled("tr")`
  border-bottom: 1px solid #d8d9d8;
  border-top: 1px solid #d8d9d8;
  height: 36px;
  width: 100%;
`;

const TableRowContainer = styled("tr")`
  border-bottom: 1px solid #d8d9d8;
  height: 49px;
  width: 100%;
`;

const TableSectionRowContainer = styled("tr")`
  background-color: rgba(232, 232, 232, 0.2);
  border-bottom: 1px solid #d8d9d8;
  height: 38px;
  width: 100%;
  td {
    &:first-of-type {
      &::before {
        content: none;
      }
    }
  }
`;

export const TableRow = forwardRef(RefForwardingTableRow);
