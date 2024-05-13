import { FilterType } from "./filter-type";

export interface TableFilterProps {
  label?: string;
  placeholder?: string;
  format?: boolean;
  selected?: boolean;
  id: string;
  dateInputType?: "single" | "range";
  type: FilterType;
}
