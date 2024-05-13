import styled from "styled-components";
import { ForwardedRef, forwardRef, ReactElement } from "react";
import { TableFooterProps } from "./table-footer";

function RefForwardingTableFooter(
  { children, ...props }: Omit<TableFooterProps, "ref">,
  ref?: ForwardedRef<HTMLTableSectionElement>,
): ReactElement | null {
  return (
    <TableFooterContainer ref={ref} {...props}>
      {children}
    </TableFooterContainer>
  );
}

const TableFooterContainer = styled("tfoot")`
  width: 100%;
  tr {
    border-bottom: none;
  }
  td {
    &:first-of-type {
      &::before {
        content: none;
      }
    }
  }
`;

export const TableFooter = forwardRef(RefForwardingTableFooter);
