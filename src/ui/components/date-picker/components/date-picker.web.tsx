import { memo, ReactElement, SyntheticEvent } from "react";
import styled from "styled-components";
import DatePickerBase, { ReactDatePickerProps } from "react-datepicker";
import { AVENIR } from "../../../constants/avenir.web";
import "react-datepicker/dist/react-datepicker.css";
import { Accessibility } from "../../../modules/accessibility";

const COMMON_PROPS: Partial<ReactDatePickerProps> = {
  showMonthDropdown: true,
  showYearDropdown: true,
  dropdownMode: "select",
  nextMonthButtonLabel: "",
  previousMonthButtonLabel: "",
  inline: true,
};

export const DatePicker = memo(function DatePicker({
  type = "single",
  startDate,
  endDate,
  ...props
}: {
  type: "single" | "range";
} & Omit<
  ReactDatePickerProps,
  "selected" | "selectsRange"
>): ReactElement | null {
  switch (type) {
    case "single":
      return <SingleDatePicker selected={startDate} {...props} />;
    case "range":
      return (
        <DateRangePicker startDate={startDate} endDate={endDate} {...props} />
      );
  }
});

export function SingleDatePicker({
  onChange,
  ...props
}: Omit<
  ReactDatePickerProps,
  "startDate" | "endDate" | "selectsRange"
>): ReactElement | null {
  return (
    <Container>
      <DatePickerBase
        {...COMMON_PROPS}
        onChange={
          onChange as (
            date: Date | null | [Date | null, Date | null],
            event: SyntheticEvent | undefined,
          ) => void
        }
        startDate={null}
        endDate={null}
        {...props}
      />
    </Container>
  );
}

export function DateRangePicker({
  onChange,
  startDate,
  endDate,
  ...props
}: Omit<
  ReactDatePickerProps,
  "selected" | "selectsRange"
>): ReactElement | null {
  return (
    <Container>
      <DatePickerBase
        {...COMMON_PROPS}
        onChange={(dates, event) => {
          if (onChange) onChange(dates as never, event);
        }}
        startDate={startDate}
        endDate={endDate}
        selected={null}
        selectsRange
        {...props}
      />
    </Container>
  );
}

const Container = styled("div")`
  & .react-datepicker {
    border: none;
    box-shadow: none;
    width: 336px;
  }
  & .react-datepicker__month-container {
    float: none;
  }

  // Header
  & .react-datepicker__header {
    display: flex;
    flex-direction: column-reverse;
    background-color: white;
    border-bottom: none;
    padding: 0;
  }
  & .react-datepicker__current-month {
    display: none;
  }

  // Week Days
  & .react-datepicker__day-names {
    background-color: #e8e8e8;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 8px;
    width: 336px;
  }
  & .react-datepicker__day-name {
    color: #3c3c3c;
    font-family: ${AVENIR};
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 15px;
    padding: 7px 0px 6px 0px;
    width: 48px;
    margin: 0px;
  }

  // Month/Year pickers
  & .react-datepicker__month-dropdown-container,
  & .react-datepicker__year-dropdown-container {
    margin-bottom: 16px;
  }
  & .react-datepicker__year-select,
  & .react-datepicker__month-select {
    appearance: none;
    background: transparent;
    padding: 0;
    margin: 0;
    color: rgba(60, 60, 60, 1);
    font-family: ${AVENIR};
    font-size: 14px;
    font-weight: 600;
    font-style: normal;
    letter-spacing: 0px;
    text-align: left;
    // remove 1 for border
    padding: 1px 7px;
    outline: none;
    border-radius: 4px;
    border: 1px solid #e8e8e8;

    &:hover {
      border-color: #c7c7c7;
    }

    &:active {
      border-color: #b1b1b1;
    }
  }

  // Next/Prev Month buttons
  & .react-datepicker__navigation {
    ${Accessibility.Focus};

    position: absolute;
    appearance: none;
    top: 36px;
    width: 23px;
    height: 23px;
    margin: 0;
    padding: 0;
    border-radius: 4px;
    border: 1px solid #e8e8e8;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      border-color: #c7c7c7;
    }

    &:active {
      border-color: #b1b1b1;
    }
  }
  & .react-datepicker__navigation.react-datepicker__navigation--previous {
    left: 8px;
  }
  & .react-datepicker__navigation.react-datepicker__navigation--next {
    right: 8px;
  }
  & .react-datepicker__navigation-icon--next,
  & .react-datepicker__navigation-icon--previous {
    position: static;
    border: none;
    transform: rotate(0deg);
    background-image: url(${require("../assets/arrow.svg")});
    background-size: contain;
    background-repeat: no-repeat;
    width: 13px;
    height: 11px;
    &::before {
      border: none;
      content: none;
      display: none;
    }
  }
  & .react-datepicker__navigation-icon--previous {
    transform: rotate(180deg);
  }

  // Month
  & .react-datepicker__month {
    padding: 0;
    margin: 0;
  }

  // Day
  & .react-datepicker__day {
    color: #3c3c3c;
    margin: 4px 0 4px 0;
    padding-top: 7px;
    width: 48px;
    border-radius: 4px;
    font-family: ${AVENIR};
    font-size: 14px;
    letter-spacing: 0px;
    line-height: 19px;
    font-weight: 600;
    user-select: none;
    height: 32px;
    box-sizing: border-box;
    outline-color: #ffc800;
    outline-width: 2px;
    z-index: 1;
    position: relative;

    &:hover {
      background-color: #e8e8e8;
    }

    &:active {
      background-color: #c7c7c7;
    }
  }
  & .react-datepicker__day.react-datepicker__day--today {
    box-shadow: inset 0 0 0 1px #e8e8e8;

    &:hover {
      background-color: #e8e8e8;
    }

    &:active {
      box-shadow: inset 0 0 0 1px #c7c7c7;
      background-color: #c7c7c7;
    }
  }
  & .react-datepicker__day.react-datepicker__day--outside-month {
    font-weight: 400;
  }
  & .react-datepicker__day.react-datepicker__day--disabled {
    font-weight: 400;
    color: #e8e8e8 !important;

    &:hover {
      background-color: transparent;
    }
  }

  // Single day selected
  & .react-datepicker__day.react-datepicker__day--selected {
    background-color: #2271c3;
    color: white;
    font-weight: 600;
  }
  &
    .react-datepicker__day.react-datepicker__day--today.react-datepicker__day--selected {
    box-shadow: inset 0 0 0 1px transparent;

    &:hover {
      background-color: #2271c3;
    }

    &:active {
      background-color: #2271c3;
    }
  }

  // Day range
  & .react-datepicker__day.react-datepicker__day--in-range,
  & .react-datepicker__day.react-datepicker__day--in-selecting-range {
    background-color: #dcedff;
    border-radius: 0px;
    color: #3c3c3c;
  }
  & .react-datepicker__day.react-datepicker__day--in-selecting-range:hover {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  & .react-datepicker__day.react-datepicker__day--range-end,
  & .react-datepicker__day.react-datepicker__day--range-start,
  & .react-datepicker__day.react-datepicker__day--selecting-range-start,
  & .react-datepicker__day.react-datepicker__day--selecting-range-end {
    background-color: #2271c3;
    border-radius: 4px;
    color: white;
    font-weight: 600;
  }
  &
    .react-datepicker__day.react-datepicker__day--today.react-datepicker__day--range-end,
  &
    .react-datepicker__day.react-datepicker__day--today.react-datepicker__day--range-start,
  &
    .react-datepicker__day.react-datepicker__day--today.react-datepicker__day--selecting-range-start,
  &
    .react-datepicker__day.react-datepicker__day--today.react-datepicker__day--selecting-range-end {
    box-shadow: inset 0 0 0 1px transparent;
  }

  &
    .react-datepicker__day.react-datepicker__day--range-end.react-datepicker__day--in-range {
    background-color: #dcedff;
    border-radius: 0px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    &::before {
      position: absolute;
      content: "";
      pointer-events: none;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #2271c3;
      border-radius: 4px;
      z-index: -1;
    }
  }

  &
    .react-datepicker__day.react-datepicker__day--range-start.react-datepicker__day--in-range,
  &
    .react-datepicker__day.react-datepicker__day--selecting-range-start.react-datepicker__day--in-selecting-range {
    background-color: #dcedff;
    border-radius: 0px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    &::before {
      position: absolute;
      content: "";
      pointer-events: none;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #2271c3;
      border-radius: 4px;
      z-index: -1;
    }
  }

  // Day Keyboard Accessible
  & .react-datepicker__day--keyboard-selected[aria-selected="false"] {
    background-color: transparent;
    color: #3c3c3c;
    z-index: 100;
  }
  & .react-datepicker__day--in-range.react-datepicker__day--keyboard-selected,
  &
    .react-datepicker__day--in-selecting-range.react-datepicker__day--keyboard-selected {
    background-color: #dcedff;
    color: #fff;
    z-index: 100;
  }
  & .react-datepicker__day--keyboard-selected[aria-selected="true"] {
    background-color: #2271c3;
    color: #fff;
    z-index: 100;
  }
`;
