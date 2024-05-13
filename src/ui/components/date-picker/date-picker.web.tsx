import {
  useState,
  useCallback,
  ReactElement,
  useRef,
  forwardRef,
  ForwardedRef,
  useImperativeHandle,
  SyntheticEvent,
  useMemo,
} from "react";
import styled from "styled-components";
import { Button } from "../button/button.web";
import { Glyph } from "../glyphs/glyph.web";
import { createDate, formatDateTime } from "../../__common__";
import { DatePicker as DatePickerBase } from "./components/date-picker.web";
import {
  DatePickerProps,
  DatePickerRef,
  SingleDatePickerProps,
  DateRangePickerProps,
} from "./date-picker";
import { TextInput } from "./components/text-input.web";

export const DatePickerWithoutTimeZone = forwardRef(
  function DatePickerWithoutTimeZone(
    {
      type = "single",
      date,
      startDate,
      endDate,
      onChange,
      onCancel,
      onApply,
      onClear,
      onStateChange,
      hideClear,
      ...props
    }: DatePickerProps,
    ref?: ForwardedRef<DatePickerRef>
  ): ReactElement | null {
    const [start, setStart] = useState<Date | null>(
      type === "single" ? date ?? null : startDate ?? null
    );
    const [end, setEnd] = useState<Date | null>(
      type === "single" ? null : endDate ?? null
    );

    const handleChange = useCallback(
      (date: Date | null | [Date | null, Date | null]) => {
        if (Array.isArray(date)) {
          setStart(date[0]);
          setEnd(date[1]);
          if (onStateChange) onStateChange(date[0], date[1]);
        } else {
          setStart(date);
          setEnd(null);
          if (onStateChange)
            (onStateChange as (date: Date | null) => unknown)(date);
        }
      },
      [onStateChange]
    );

    const handleCancel = useCallback(() => {
      setStart(null);
      setEnd(null);
      if (onStateChange) {
        if (type === "range") onStateChange(null, null);
        else (onStateChange as (date: Date | null) => unknown)(null);
      }
      if (onCancel)
        onCancel(
          new Event("cancel", { bubbles: true }) as unknown as SyntheticEvent
        );
    }, [onCancel, onStateChange, type]);

    const handleClear = useCallback(() => {
      setStart(null);
      setEnd(null);
      const event = new Event("change", { bubbles: true });
      if (type === "single" || type === undefined) {
        const typedOnChange = onChange as SingleDatePickerProps["onChange"];
        if (typedOnChange)
          typedOnChange(null, event as unknown as SyntheticEvent);
        if (onStateChange)
          (onStateChange as (date: Date | null) => unknown)(null);
      } else if (type === "range") {
        const typedOnChange = onChange as DateRangePickerProps["onChange"];
        if (typedOnChange)
          typedOnChange(null, null, event as unknown as SyntheticEvent);
        if (onStateChange) onStateChange(null, null);
      }
      if (onClear)
        onClear(
          new Event("cancel", { bubbles: true }) as unknown as SyntheticEvent
        );
    }, [onChange, onStateChange, type, onClear]);

    const handleApply = useCallback(() => {
      const event = new Event("change", { bubbles: true });
      if (type === "single" || type === undefined) {
        const typedOnChange = onChange as SingleDatePickerProps["onChange"];
        const typedOnApply = onApply as SingleDatePickerProps["onApply"];
        if (typedOnChange)
          typedOnChange(start, event as unknown as SyntheticEvent);
        if (onStateChange)
          (onStateChange as (date: Date | null) => unknown)(null);
        if (typedOnApply)
          typedOnApply(
            start,
            new Event("cancel", { bubbles: true }) as unknown as SyntheticEvent
          );
      } else if (type === "range") {
        const typedOnChange = onChange as DateRangePickerProps["onChange"];
        const typedOnApply = onApply as DateRangePickerProps["onApply"];
        const rangeStartDate = start === null ? end : start;
        const rangeEndDate = end === null ? start : end;
        if (typedOnChange)
          typedOnChange(
            rangeStartDate,
            rangeEndDate,
            event as unknown as SyntheticEvent
          );
        if (onStateChange) onStateChange(null, null);
        if (typedOnApply)
          typedOnApply(
            rangeStartDate,
            rangeEndDate,
            new Event("cancel", { bubbles: true }) as unknown as SyntheticEvent
          );
      }
    }, [end, onChange, start, type, onStateChange, onApply]);

    const endDateInputRef = useRef<HTMLInputElement>(null);

    const handleInputEnter = useCallback(
      (date: Date) => {
        const event = new Event("change", { bubbles: true });
        if (type === "single" || type === undefined) {
          const typedOnChange = onChange as SingleDatePickerProps["onChange"];
          if (typedOnChange)
            typedOnChange(date, event as unknown as SyntheticEvent);
        } else if (type === "range") {
          const typedOnChange = onChange as DateRangePickerProps["onChange"];
          if (typedOnChange)
            typedOnChange(start, date, event as unknown as SyntheticEvent);
        }
      },
      [onChange, start, type]
    );

    useImperativeHandle(ref, () => ({
      apply: handleApply,
      cancel: handleCancel,
    }));

    return (
      <Container>
        <ToolBar>
          {type === "range" ? (
            <>
              <TextInput
                value={start}
                placeholder="Start date"
                onChange={(date) => {
                  setStart(date);
                  if (onStateChange) onStateChange(date, end);
                }}
                onEnter={() => {
                  endDateInputRef.current?.focus();
                }}
                autoFocus
              />
              <Glyph name="arrow-right" size={16} color="#3C3C3C" />
              <TextInput
                value={end}
                placeholder="End date"
                onChange={(date) => {
                  setEnd(date);
                  if (onStateChange) onStateChange(start, date);
                }}
                onEnter={handleInputEnter}
                ref={endDateInputRef}
              />
            </>
          ) : (
            <TextInput
              value={start}
              placeholder="Date"
              onChange={(date) => {
                setStart(date);
                if (onStateChange)
                  (onStateChange as (date: Date | null) => unknown)(date);
              }}
              onEnter={handleInputEnter}
              autoFocus
            />
          )}
        </ToolBar>
        <DatePickerBase
          type={type}
          onChange={handleChange}
          startDate={start}
          endDate={end}
          key={type}
          {...props}
        />
        <ActionBar>
          <ColumnLeft>
            {!hideClear ? (
              <Button color="red" onClick={handleClear} variant="text">
                Clear
              </Button>
            ) : null}
          </ColumnLeft>
          <ColumnRight>
            <Button onClick={handleCancel} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleApply} variant="contained">
              Apply
            </Button>
          </ColumnRight>
        </ActionBar>
      </Container>
    );
  }
);

function createLocalDate(date: Date, timeZone: string): Date {
  const parts = formatDateTime(date, "yyyy-MM-dd", timeZone)
    .split("-")
    .map((a) => parseInt(a));
  return new Date(parts[0], parts[1] - 1, parts[2], 0, 0, 0, 0);
}

export const DatePicker = forwardRef(function TimeZoneWrapper(
  {
    type,
    onChange,
    onStateChange,
    date,
    startDate,
    endDate,
    timeZone,
    ...props
  }: DatePickerProps,
  ref?: ForwardedRef<DatePickerRef>
) {
  const handleChange = useCallback(
    (
      startDate: Date | null,
      endDateOrEvent: Date | SyntheticEvent | null,
      event: SyntheticEvent | undefined
    ) => {
      if (type === "single") {
        if (startDate && timeZone && onChange) {
          onChange(
            createDate(
              startDate.getFullYear(),
              startDate.getMonth() + 1,
              startDate.getDate(),
              timeZone
            ),
            event as SyntheticEvent
          );
        } else if (onChange) {
          onChange(startDate as never, event as SyntheticEvent);
        }
      } else {
        if (timeZone && onChange) {
          onChange(
            startDate
              ? createDate(
                  startDate.getFullYear(),
                  startDate.getMonth() + 1,
                  startDate.getDate(),
                  timeZone
                )
              : null,
            (endDateOrEvent
              ? createDate(
                  (endDateOrEvent as Date).getFullYear(),
                  (endDateOrEvent as Date).getMonth() + 1,
                  (endDateOrEvent as Date).getDate(),
                  timeZone
                )
              : null) as never,
            event as SyntheticEvent
          );
        } else if (onChange) {
          onChange(startDate, endDateOrEvent as never, event as SyntheticEvent);
        }
      }
    },
    [onChange, timeZone, type]
  );

  const handleStateChange = useCallback(
    (startDate: Date | null, endDate: Date | null) => {
      if (type === "single") {
        if (startDate && timeZone && onStateChange) {
          onStateChange(
            createDate(
              startDate.getFullYear(),
              startDate.getMonth() + 1,
              startDate.getDate(),
              timeZone
            )
          );
        } else if (onStateChange) {
          onStateChange(startDate as never);
        }
      } else {
        if (timeZone && onStateChange) {
          onStateChange(
            startDate
              ? createDate(
                  startDate.getFullYear(),
                  startDate.getMonth() + 1,
                  startDate.getDate(),
                  timeZone
                )
              : null,
            endDate
              ? createDate(
                  endDate.getFullYear(),
                  endDate.getMonth() + 1,
                  endDate.getDate(),
                  timeZone
                )
              : null
          );
        } else if (onStateChange) {
          onStateChange(startDate, endDate);
        }
      }
    },
    [onStateChange, timeZone, type]
  );

  const { _date, _startDate, _endDate } = useMemo(
    () => ({
      _date: date && timeZone ? createLocalDate(date, timeZone) : date,
      _startDate:
        startDate && timeZone
          ? createLocalDate(startDate, timeZone)
          : startDate,
      _endDate:
        endDate && timeZone ? createLocalDate(endDate, timeZone) : endDate,
    }),
    [date, startDate, endDate, timeZone]
  );

  return (
    <DatePickerWithoutTimeZone
      type={type as never}
      onChange={handleChange as never}
      onStateChange={handleStateChange as never}
      date={_date as never}
      startDate={_startDate as never}
      endDate={_endDate as never}
      ref={ref}
      {...props}
    />
  );
});

const Container = styled("div")`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 336px;
`;

const ToolBar = styled("div")`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 39px;
  width: 336px;
`;

const ActionBar = styled("div")`
  border-top: 1px solid #e8e8e8;
  box-sizing: border-box;
  display: flex;
  margin: auto;
  padding: 8px;
  width: 336px;
`;

const ColumnLeft = styled("div")`
  align-items: center;
  display: flex;
  justify-content: flex-end;
`;

const ColumnRight = styled("div")`
  align-items: center;
  display: flex;
  flex: 1;
  gap: 0px 8px;
  justify-content: flex-end;
`;
