import { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";

export interface TableFooterProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  > {}

export function TableFooter(props: TableFooterProps): ReactElement | null;
