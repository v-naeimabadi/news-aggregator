import { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";

export interface TableCellProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  > {
  textAlign?: "center" | "left" | "right";
  colspan?: number;
}

export function TableCell(props: TableCellProps): ReactElement | null;
