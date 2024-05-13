import { FieldPath, FieldValues } from "react-hook-form";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactElement,
  SyntheticEvent,
} from "react";
import { DateRangePickerProps, SingleDatePickerProps } from "../date-picker";

interface DatePickerInputPropsBase
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    "ref" | "onChange" | "value"
  > {
  ref?: RefObject<HTMLButtonElement>;
  error?: boolean;
  disabled?: boolean;
  placeholder?: string;
  onCancel?: (event: SyntheticEvent) => void;
  onClear?: (event: SyntheticEvent) => void;
  hideClear?: boolean;
  timeZone?: string;
}

export interface SingleDatePickerInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends DatePickerInputPropsBase {
  type?: "single" | undefined;
  date?: Date | null;
  connect?: TFieldName | string;
  connectStart?: never;
  connectEnd?: never;
  startDate?: never;
  endDate?: never;
  onChange?: (date: Date | null, event: SyntheticEvent) => unknown;
  onStateChange?: (date: Date | null) => unknown;
  datePickerProps?: SingleDatePickerProps;
}

export interface DateRangePickerInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends DatePickerInputPropsBase {
  type: "range";
  date?: never;
  connect?: never;
  connectStart?: TFieldName | string;
  connectEnd?: TFieldName | string;
  startDate?: Date | null;
  endDate?: Date | null;
  onChange?: (
    startDate: Date | null,
    endDate: Date | null,
    event: SyntheticEvent,
  ) => unknown;
  onStateChange?: (startDate: Date | null, endDate: Date | null) => unknown;
  datePickerProps?: DateRangePickerProps;
}

export type DatePickerInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> =
  | DateRangePickerInputProps<TFieldValues, TFieldName>
  | SingleDatePickerInputProps<TFieldValues, TFieldName>;

export function DatePickerInput(
  props: DatePickerInputProps,
): ReactElement | null;
