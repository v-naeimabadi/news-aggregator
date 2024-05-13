import { ReactElement, Ref, ReactElement, SyntheticEvent } from "react";
import { ReactDatePickerProps } from "react-datepicker";

export interface DatePickerRef {
  apply: () => void;
  cancel: () => void;
}

interface RDPProps
  extends Omit<
    ReactDatePickerProps,
    | "selected"
    | "startDate"
    | "endDate"
    | "selectsRange"
    | "onChange"
    | "ref"
    | "value"
  > {}

interface CommonProps {
  onCancel?: (event: SyntheticEvent) => void;
  onClear?: (event: SyntheticEvent) => void;
  ref?: Ref<DatePickerRef>;
  hideClear?: boolean;
  timeZone?: string;
}

export interface SingleDatePickerProps extends RDPProps, CommonProps {
  type?: "single" | undefined;
  date?: Date | null;
  startDate?: never;
  endDate?: never;
  onChange?: (date: Date | null, event: SyntheticEvent) => unknown;
  onStateChange?: (date: Date | null) => unknown;
  onApply?: (date: Date | null, event: SyntheticEvent) => void;
}

export interface DateRangePickerProps extends RDPProps, CommonProps {
  type: "range";
  date?: never;
  startDate?: Date | null;
  endDate?: Date | null;
  onChange?: (
    startDate: Date | null,
    endDate: Date | null,
    event: SyntheticEvent,
  ) => unknown;
  onStateChange?: (startDate: Date | null, endDate: Date | null) => unknown;
  onApply?: (
    startDate: Date | null,
    endDate: Date | null,
    event: SyntheticEvent,
  ) => void;
}

export type DatePickerProps = SingleDatePickerProps | DateRangePickerProps;

export function DateRangePicker(props: DatePickerProps): ReactElement | null;
