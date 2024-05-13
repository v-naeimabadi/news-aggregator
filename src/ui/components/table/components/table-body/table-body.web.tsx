import styled from "styled-components";
import { ReactElement, ForwardedRef, forwardRef } from "react";
import { ActivityIndicator } from "../../../activity-indicator/activity-indicator.web";
import { TableBodyProps } from "./table-body";

function RefForwardingTableBody(
  { children, loading = false, ...props }: Omit<TableBodyProps, "ref">,
  ref?: ForwardedRef<HTMLTableSectionElement>,
): ReactElement | null {
  return (
    <TableBodyContainer ref={ref} {...props}>
      {loading ? (
        <ActivityIndicatorContainer>
          <ActivityIndicator />
        </ActivityIndicatorContainer>
      ) : (
        children
      )}
    </TableBodyContainer>
  );
}

const TableBodyContainer = styled("tbody")``;

const ActivityIndicatorContainer = styled("div")`
  align-items: center;
  display: flex;
  height: calc(100vh - 180px);
  justify-content: center;
  width: calc(100vw - 290px);
  @media (max-width: 1024px) {
    width: calc(100vw - 40px);
    height: calc(100vh - 170px);
  }
`;

export const TableBody = forwardRef(RefForwardingTableBody);
