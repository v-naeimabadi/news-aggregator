/* eslint-disable no-restricted-syntax */
import {
  ReactElement,
  SyntheticEvent,
  useRef,
  useState,
  ForwardedRef,
  forwardRef,
  useMemo,
} from "react";
import styled from "styled-components";
import { Controller, useFormContext } from "react-hook-form";
import { format } from "date-fns";
import { Glyph } from "../glyphs/glyph.web";
import { AVENIR } from "../../constants/avenir.web";
import { DropDown } from "../drop-down/drop-down.web";
import { DatePicker } from "../date-picker/date-picker.web";
import {
  DatePickerRef,
  DateRangePickerProps,
  SingleDatePickerProps,
} from "../date-picker";
import {
  DatePickerInputProps,
  DateRangePickerInputProps,
  SingleDatePickerInputProps,
} from "./date-picker-input";
import { formatDateTime } from "../../__common__";

const ConnectedSingleDatePickerInput = forwardRef(
  function ConnectedSingleDatePickerInput(
    {
      connect,
      date: _date,
      startDate: _startDate,
      endDate: _endDate,
      onChange,
      ...props
    }: Omit<SingleDatePickerInputProps, "ref" | "type">,
    ref?: ForwardedRef<HTMLButtonElement>,
  ) {
    const { control, setValue } = useFormContext() || {};
    return (
      <Controller
        name={connect || ""}
        control={control}
        render={({ field }) => (
          <DatePickerInputBase
            type="single"
            date={field.value}
            onChange={(date: Date | null, event: SyntheticEvent) => {
              if (onChange) onChange(date, event);
              if (!event.defaultPrevented) {
                setValue(connect || "", date);
              }
            }}
            ref={ref}
            {...props}
          />
        )}
      />
    );
  },
);

const ConnectedDatePickerRangeInput = forwardRef(
  function ConnectedDatePickerRangeInput(
    {
      connectEnd,
      connectStart,
      date: _date,
      startDate: _startDate,
      endDate: _endDate,
      onChange,
      ...props
    }: Omit<DateRangePickerInputProps, "ref" | "type">,
    ref?: ForwardedRef<HTMLButtonElement>,
  ) {
    const { control, setValue } = useFormContext() || {};
    return (
      <Controller
        name={connectStart || ""}
        control={control}
        render={({ field: fieldStart }) => (
          <Controller
            name={connectStart || ""}
            control={control}
            render={({ field: fieldEnd }) => (
              <DatePickerInputBase
                type="range"
                startDate={fieldStart.value}
                endDate={fieldEnd.value}
                onChange={(
                  startDate: Date | null,
                  endDate: Date | null,
                  event: SyntheticEvent,
                ) => {
                  if (onChange) onChange(startDate, endDate, event);
                  if (!event.defaultPrevented) {
                    setValue(connectStart || "", startDate, {
                      shouldValidate: true,
                    });
                    setValue(connectEnd || "", endDate, {
                      shouldValidate: true,
                    });
                  }
                }}
                ref={ref}
                {...props}
              />
            )}
          />
        )}
      />
    );
  },
);

const DatePickerInputBase = forwardRef(function DateInputBase(
  {
    error,
    disabled,
    type = "single",
    date,
    startDate,
    endDate,
    placeholder,
    onChange,
    onStateChange,
    onClick,
    onClear,
    onCancel,
    hideClear,
    datePickerProps,
    timeZone,
    ...props
  }: DatePickerInputProps,
  ref?: ForwardedRef<HTMLButtonElement>,
): ReactElement | null {
  const datePicker = useRef<DatePickerRef>(null);
  const [startState, setStartState] = useState<null | Date>(null);
  const [endState, setEndState] = useState<null | Date>(null);
  const [open, setOpen] = useState(false);

  const {
    formattedStartState,
    formattedEndState,
    formattedStartValue,
    formattedEndValue,
  } = useMemo(() => {
    const formattedStartState =
      type === "single"
        ? startState && timeZone
          ? formatDateTime(startState, "MMM d, yyyy", timeZone)
          : startState
          ? format(startState, "MMM d, yyyy")
          : null
        : startState
        ? format(startState, "MMM d, yyyy")
        : null;
    const formattedEndState =
      type === "single"
        ? null
        : endState && timeZone
        ? formatDateTime(endState, "MMM d, yyyy", timeZone)
        : endState
        ? format(endState, "MMM d, yyyy")
        : null;
    const formattedStartValue =
      type === "single"
        ? date && timeZone
          ? formatDateTime(date, "MMM d, yyyy", timeZone)
          : date
          ? format(date, "MMM d, yyyy")
          : null
        : startDate
        ? format(startDate, "MMM d, yyyy")
        : null;
    const formattedEndValue =
      type === "single"
        ? null
        : endDate && timeZone
        ? formatDateTime(endDate, "MMM d, yyyy", timeZone)
        : endDate
        ? format(endDate, "MMM d, yyyy")
        : null;
    return {
      formattedStartState,
      formattedEndState,
      formattedStartValue,
      formattedEndValue,
    };
  }, [date, endDate, endState, startDate, startState, type, timeZone]);

  return (
    <DropDown
      open={open}
      onRequestOpen={() => setOpen(true)}
      onRequestClose={(event) => {
        if (event.source === "escape") {
          if (datePicker.current) datePicker.current.cancel();
        } else {
          if (datePicker.current) datePicker.current.apply();
        }
        setOpen(false);
      }}
      minHeight={410}
      content={
        type === "single" ? (
          <DatePicker
            ref={datePicker}
            type="single"
            date={date}
            onStateChange={(date) => {
              setStartState(date);
              if (onStateChange)
                (onStateChange as (date: Date | null) => unknown)(date);
            }}
            onChange={(date, event) => {
              if (onChange)
                (
                  onChange as (
                    date: Date | null,
                    event: SyntheticEvent,
                  ) => unknown
                )(date, event);
            }}
            onApply={() => setOpen(false)}
            onCancel={(e) => {
              if (onCancel) onCancel(e);
              if (!e.defaultPrevented) setOpen(false);
            }}
            onClear={onClear}
            hideClear={hideClear}
            timeZone={timeZone}
            {...(datePickerProps as SingleDatePickerProps)}
          />
        ) : (
          <DatePicker
            ref={datePicker}
            type="range"
            startDate={startDate}
            endDate={endDate}
            onStateChange={(startDate, endDate) => {
              setStartState(startDate);
              setEndState(endDate);
              if (onStateChange) onStateChange(startDate, endDate);
            }}
            onChange={(startDate, endDate, event) => {
              setOpen(false);
              if (onChange)
                (
                  onChange as (
                    startDate: Date | null,
                    endDate: Date | null,
                    event: SyntheticEvent,
                  ) => unknown
                )(startDate, endDate, event);
            }}
            onCancel={(e) => {
              if (onCancel) onCancel(e);
              if (!e.defaultPrevented) setOpen(false);
            }}
            onClear={onClear}
            hideClear={hideClear}
            {...(datePickerProps as Omit<DateRangePickerProps, "type">)}
          />
        )
      }
    >
      <Container
        ref={ref}
        disabled={disabled}
        error={!!error}
        focus={open}
        onClick={(event) => !disabled && onClick && onClick(event)}
        type="button"
        {...props}
      >
        {type === "single" ? (
          <Label hasValue={!!formattedStartState || !!formattedStartValue}>
            {formattedStartState ?? formattedStartValue ?? placeholder}
          </Label>
        ) : (
          <RangeLabel
            hasStartValue={!!formattedStartState || !!formattedStartValue}
            hasEndValue={!!formattedEndState || !!formattedEndValue}
            startLabel={formattedStartState ?? formattedStartValue}
            endLabel={formattedEndState ?? formattedEndValue}
            placeholder={placeholder}
          />
        )}
        <GlyphContainer>
          <Glyph name="calendar" color="#3C3C3C" size={16} />
        </GlyphContainer>
      </Container>
    </DropDown>
  );
});

export const DatePickerInput = forwardRef(function DateInput(
  {
    type = "single",
    connect,
    connectStart,
    connectEnd,
    ...props
  }: DatePickerInputProps & Omit<DatePickerInputProps, "ref">,
  ref?: ForwardedRef<HTMLButtonElement>,
): ReactElement {
  if (connect || connectStart || connectEnd) {
    if (type === "single") {
      return (
        <ConnectedSingleDatePickerInput
          connect={connect}
          ref={ref}
          {...(props as SingleDatePickerInputProps)}
        />
      );
    } else {
      return (
        <ConnectedDatePickerRangeInput
          connectStart={connectStart}
          connectEnd={connectEnd}
          ref={ref}
          {...(props as DateRangePickerInputProps)}
        />
      );
    }
  }
  return (
    <DatePickerInputBase
      {...(props as Record<string, unknown>)}
      type={type}
      ref={ref}
    />
  );
});

const Container = styled("button").withConfig<{
  error: boolean;
  focus: boolean;
}>({
  shouldForwardProp: (prop) => prop !== "error" && prop !== "focus",
})`
  align-items: center;
  display: flex;
  position: relative;
  min-height: 19px;
  border: 1px solid
    ${({ error, focus }) =>
      !error ? (focus ? "#2271c3" : "#c7c7c7") : "#ff3232"};
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled === true ? "default" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  outline: none;
  // height is 19 + padding (top 7, bottom 6). Account for border on all sides so -1px on all sides
  padding: 6px 11px 5px 11px;
  background-color: transparent;
  box-sizing: border-box;

  &:hover {
    border-color: ${({ disabled, error, focus }) =>
      !disabled && !error ? (focus ? "#2271c3" : "#9c9c9c") : "inherit"};
  }

  &:focus {
    border-color: ${({ disabled, error }) =>
      !disabled && !error ? "#2271c3" : "inherit"};
  }

  &:active {
    border-color: ${({ disabled, error }) =>
      !disabled && !error ? "#2271c3" : "inherit"};
  }
`;

const Label = styled("span")<{ hasValue?: boolean }>`
  color: ${({ hasValue }) => (hasValue ? "#3c3c3c" : "#9c9c9c")};
  flex: 1;
  font-family: ${AVENIR};
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0px;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const GlyphContainer = styled("div")`
  height: 16px;
  margin-left: 8px;
  transform: translateY(-0.5px) translateX(1px);
  width: 16px;
`;

function RangeLabel({
  hasStartValue,
  hasEndValue,
  startLabel,
  endLabel,
  placeholder,
}: {
  hasStartValue: boolean;
  hasEndValue: boolean;
  startLabel?: string | null;
  endLabel?: string | null;
  placeholder?: string | null;
}): ReactElement | null {
  if (!hasStartValue && !hasEndValue) {
    return <Label hasValue={false}>{placeholder}</Label>;
  }
  return (
    <RangeLabelContainer>
      <RangeLabelLabel hasValue={hasStartValue}>
        {startLabel ?? "Start date"}
      </RangeLabelLabel>
      <Arrow name="arrow-right" color="#3c3c3c" size={14} />
      <RangeLabelLabel hasValue={hasEndValue}>
        {endLabel ?? "End date"}
      </RangeLabelLabel>
    </RangeLabelContainer>
  );
}

const RangeLabelContainer = styled("div")`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  min-height: 19px;
`;

const RangeLabelLabel = styled(Label)`
  flex: inherit;
  flex: 0;
`;

const Arrow = styled(Glyph)`
  margin-left: 8px;
  margin-right: 8px;
`;
