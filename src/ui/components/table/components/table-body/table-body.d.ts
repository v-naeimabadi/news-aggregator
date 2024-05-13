import { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";

export interface TableBodyProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  > {
  loading?: boolean;
}

export function TableBody(props: TableBodyProps): ReactElement | null;
