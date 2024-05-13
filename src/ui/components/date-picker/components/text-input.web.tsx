import {
  useState,
  useCallback,
  ReactElement,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  forwardRef,
  ForwardedRef,
  createElement,
} from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { AVENIR } from "../../../constants/avenir.web";
import { isSafariOnIOs } from "../../../utils/is-safari-on-ios";
import { isSafariOnMacOs } from "../../../utils/is-safari-on-macos";
import { parseDate } from "../utils/parse-date";
import { isFirefox } from "../../../utils/is-firefox";
import { TextInputSafariIOs } from "./text-input-safari-ios.web";

interface Props {
  value: null | Date;
  placeholder: string;
  onChange: (date: Date) => void;
  onEnter: (date: Date) => void;
  autoFocus?: boolean;
}

export const TextInput = forwardRef(function TextInput(
  { value, placeholder, onChange, autoFocus, onEnter }: Props,
  inputRef?: ForwardedRef<HTMLInputElement>
): ReactElement | null {
  const [, forceUpdate] = useState(0);
  const nextValue = value ? value.toISOString().substring(0, 10) : "";
  const currentValue = useRef(nextValue);
  const prevValue = useRef(nextValue);
  if (prevValue.current !== nextValue) {
    currentValue.current = nextValue;
  }
  prevValue.current = nextValue;
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value) {
        currentValue.current = e.target.value;
        const date = parseDate(e.target.value, "yyyy-mm-dd");
        if (typeof e.target.value === "string") {
          const year = e.target.value.replace(/^(\d{4,5})-.+$/, "$1");
          if (year.match(/^\d{0,4}$/)) {
            date?.setFullYear(parseInt(year, 10));
          } else if (year.match(/^\d+$/)) {
            date?.setFullYear(parseInt(year.substring(0, 4), 10));
          }
        }
        if (date) {
          onChange(date);
        }
      }
      forceUpdate((s) => s + 1);
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const date = parseDate(currentValue.current, "yyyy-mm-dd");
        if (date) {
          onEnter(date);
        }
      }
    },
    [onEnter]
  );

  const placeholderValue = value ? format(value, "MMM d, yyyy") : placeholder;

  const [focused, setFocused] = useState(
    isSafariOnMacOs() && autoFocus ? true : false
  );
  const handleFocus = useCallback(() => {
    setFocused(true);
  }, []);
  const handleBlur = useCallback(() => {
    setFocused(false);
  }, []);

  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <Container>
      {createElement(isSafariOnIOs() ? TextInputSafariIOs : Input, {
        ref: (element: HTMLInputElement) => {
          if (typeof inputRef === "function") {
            inputRef(element);
          } else if (typeof inputRef === "object" && inputRef) {
            inputRef.current = element;
          }
          ref.current = element;
        },
        type: "date",
        value: currentValue.current,
        onChange: handleChange,
        onFocus: handleFocus,
        onBlur: handleBlur,
        autoFocus: autoFocus,
        onKeyDown: handleKeyDown,
      })}
      {isFirefox() ? <HideFirefoxCalendar /> : null}
      <Placeholder
        visible={!focused}
        value={!!value}
        onClick={() => {
          ref.current?.focus();
        }}
      >
        {placeholderValue}
      </Placeholder>
    </Container>
  );
});

const Container = styled("div")`
  display: flex;
  flex: 1;
  height: 39px;
  position: relative;
`;

const Input = styled("input")`
  appearance: none;
  background: transparent;
  border: none;
  color: #3c3c3c;
  cursor: text;
  display: flex;
  font-family: ${AVENIR};
  font-size: 14px;
  justify-content: center;
  letter-spacing: 0px;
  line-height: 19px;
  margin: 0;
  outline: none;
  padding: 0;
  padding-left: ${isFirefox() ? "24px" : "0px"};
  text-align: center;
  width: 100%;

  &::placeholder {
    color: #b1b1b1;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-calendar-picker-indicator,
  &::-webkit-input-placeholder {
    -webkit-appearance: none;
    display: none;
    visibility: hidden !important;
  }
`;

const HideFirefoxCalendar = styled("div")`
  background: white;
  content: "";
  height: 20px;
  position: absolute;
  right: 0px;
  top: 10px;
  width: 24px;
  z-index: 1000;
`;

const Placeholder = styled("div")<{ visible: boolean; value: boolean }>`
  align-items: center;
  background: #ffffff;
  bottom: 0;
  color: ${({ value }) => (value ? "#3c3c3c" : "#b1b1b1")};
  cursor: text;
  display: flex;
  font-family: ${AVENIR};
  font-size: 14px;
  justify-content: center;
  left: 0;
  letter-spacing: 0px;
  line-height: 19px;
  opacity: ${({ visible }) => (visible ? "1" : "0")};
  pointer-events: ${({ visible }) =>
    visible ? (isSafariOnMacOs() ? "none" : "all") : "none"};
  position: absolute;
  right: 0;
  top: 0;
`;
