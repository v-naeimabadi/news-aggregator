import styled from "styled-components";
import { ForwardedRef, forwardRef, ReactElement } from "react";
import { TableCellProps } from "./table-cell";

function RefForwardingTableCell(
  { children, textAlign, ...props }: Omit<TableCellProps, "ref">,
  ref?: ForwardedRef<HTMLTableCellElement>
): ReactElement | null {
  return (
    <TableCellContainer textAlign={textAlign} ref={ref} {...props}>
      {children}
    </TableCellContainer>
  );
}
const TableCellContainer = styled("td").withConfig<{
  textAlign?: "center" | "left" | "right";
}>({
  shouldForwardProp: (prop) => prop !== "textAlign",
})`
  max-width: fit-content;
  min-width: fit-content;
  text-align: ${({ textAlign }) => textAlign};
  &:first-of-type {
    position: relative;
    padding-left: 16px;
    &:before {
      content: "";
      display: block;
      border-left: 4px solid ${({ theme }) => "#A9A9A9"};
      position: absolute;
      left: 0px;
      top: 8px;
      height: calc(100% - 16px);
      min-height: 32px;
    }
  }
`;

export const TableCell = forwardRef(RefForwardingTableCell);
