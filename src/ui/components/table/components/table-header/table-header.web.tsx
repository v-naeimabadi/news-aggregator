import styled from "styled-components";
import { ForwardedRef, forwardRef, ReactElement } from "react";
import { TableHeaderProps } from "./table-header";

function RefForwardingTableHeader(
  { children, ...props }: Omit<TableHeaderProps, "ref">,
  ref?: ForwardedRef<HTMLTableSectionElement>,
): ReactElement | null {
  return (
    <TableHeaderContainer ref={ref} {...props}>
      {children}
    </TableHeaderContainer>
  );
}

const TableHeaderContainer = styled("thead")`
  width: 100%;
`;

export const TableHeader = forwardRef(RefForwardingTableHeader);
