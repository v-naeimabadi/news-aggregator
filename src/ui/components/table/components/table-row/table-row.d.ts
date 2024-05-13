import { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";

export interface TableRowProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  > {
  type?: "th" | "td" | "section";
}
export function TableRow(props: TableRowProps): ReactElement | null;
