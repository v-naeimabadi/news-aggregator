import { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";

export interface TableProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  > {
  hasNextPage?: boolean;
  data?: boolean;
  endCursor?: string;
  loading?: boolean;
  pagination?: boolean;
  totalPages?: number;
}

export function Table(props: TableProps): ReactElement | null;
