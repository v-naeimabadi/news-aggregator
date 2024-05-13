import { TableFilterProps } from "./table-filter-props";

export interface DatePickerFilterProps
  extends Omit<TableFilterProps, "type" | "options"> {}
