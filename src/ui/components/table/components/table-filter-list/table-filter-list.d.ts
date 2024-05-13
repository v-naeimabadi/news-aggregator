import { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";
import { ComboBoxInputProps } from "../../../combo-box-input/combo-box-input";
import { TableFilterProps } from "./components/table-filter";

export interface TableFilterListProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  filterOptions: ComboBoxInputProps["options"];
  filterList: TableFilterProps[];
  disabled?: boolean;
}

export function TableFilterList(
  props: TableFilterListProps,
): ReactElement | null;
