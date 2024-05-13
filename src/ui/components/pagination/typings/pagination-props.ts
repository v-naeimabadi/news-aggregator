import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface PaginationProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  steps?: string[];
  selectedStep?: string;
  onChangeStep?: (value: string) => unknown;
  bar?: boolean;
  disabled?: boolean;
}
