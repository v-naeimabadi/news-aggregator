import { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";
import { SortOrder } from "../../../../typings/sort-order";

export interface TableHeaderCellProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  > {
  cellKey: string;
  label?: string;

  textAlign?: "center" | "left" | "right";
  minWidth?: number | string;
  width?: number | string;
  maxWidth?: number | string;
  colspan?: number;
  sortable?: boolean;
  sortDefaultOrder?: SortOrder;
}

export function TableHeaderCell(
  props: TableHeaderCellProps,
): ReactElement | null;
