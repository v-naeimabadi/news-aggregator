import { TableFilterProps } from "./table-filter-props";

export interface ComboBoxFilterProps extends Omit<TableFilterProps, "type"> {}
