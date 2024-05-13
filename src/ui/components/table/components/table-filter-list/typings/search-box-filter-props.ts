import { TableFilterProps } from "./table-filter-props";

export interface SearchBoxFilterProps
  extends Omit<TableFilterProps, "type" | "options"> {}
