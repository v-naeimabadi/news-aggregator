import { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";

export interface TableHeaderProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  > {}

export function TableHeader(props: TableHeaderProps): ReactElement | null;
