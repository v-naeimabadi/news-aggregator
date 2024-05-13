import { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";

export interface TablePaginationProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  totalPages: number;
}

export function TablePagination(props: Pagination): ReactElement | null;
