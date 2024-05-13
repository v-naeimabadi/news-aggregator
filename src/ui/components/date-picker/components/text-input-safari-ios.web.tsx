/* eslint-disable react/jsx-key */
import {
  useCallback,
  ReactElement,
  forwardRef,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useRef,
  useState,
  ChangeEvent,
  useLayoutEffect,
  useEffect,
} from "react";
import styled from "styled-components";
import { cloneDeep, set } from "lodash";
import { AVENIR } from "../../../constants/avenir.web";
import { splitDateString } from "../utils/split-date-string";
import { parseDateFromParts } from "../utils/parse-date-from-parts";

export const TextInputSafariIOs = forwardRef<
  HTMLInputElement,
  Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "ref"
  >
>(function TextInputSafariIOs(
  { onChange, value: nextValue, ...props },
  ref,
): ReactElement | null {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState("");
  const [placeholder, setPlaceholder] = useState("mm/dd/yyyy");

  const prevValue = useRef(value);
  prevValue.current = value;
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/[^0-9/]/g, "");
      const [year, month, day] = splitDateString(value, "mm/dd/yyyy");
      let nextValue = month;
      if (day === "" && nextValue.length === 2) {
        if (!(prevValue.current.length === 3 && value.length === 2)) {
          nextValue += "/";
        }
      } else if (day !== "") {
        nextValue += "/" + day;
      }
      if (year === "" && nextValue.length === 5) {
        if (!(prevValue.current.length === 6 && value.length === 5)) {
          nextValue += "/";
        }
      } else if (year !== "") {
        nextValue += "/" + year;
      }
      const placeholder = "mm/dd/yyyy".substring(nextValue.length);
      setValue(nextValue);
      setPlaceholder(placeholder);
      const date = parseDateFromParts(year, month, day);
      if (date) {
        const event = set(cloneDeep(e), "target", {
          value: `${year}-${month}-${day}`,
        });
        if (onChange) onChange(event);
      }
    },
    [onChange],
  );

  const placeholderRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (placeholderRef.current && inputRef.current) {
      inputRef.current.style.paddingRight = `${placeholderRef.current.offsetWidth}px`;
    }
  }, [value]);

  const nextValueRef = useRef(nextValue);
  useEffect(() => {
    if (typeof nextValue === "string" && nextValueRef.current !== nextValue) {
      const [year, month, day] = splitDateString(nextValue, "yyyy-mm-dd");
      setValue(`${month}/${day}/${year}`.replace(/^\/\/$/, ""));
      nextValueRef.current = nextValue;
    }
  }, [nextValue]);

  return (
    <Container>
      <Input
        {...props}
        ref={(element: HTMLInputElement) => {
          if (typeof ref === "function") {
            ref(element);
          } else if (typeof ref === "object" && ref) {
            ref.current = element;
          }
          inputRef.current = element;
        }}
        type="text"
        inputMode="tel"
        autoCapitalize="off"
        autoCorrect="off"
        maxLength={10}
        spellCheck={false}
        autoFocus={false}
        onChange={handleChange}
        value={value}
      />
      <Placeholder>
        <div>
          <span>
            {value.split(/(\/)/g).map((p) => (
              <span className={p === "/" ? "slash" : ""}>{p}</span>
            ))}
          </span>
          <span ref={placeholderRef}>
            {placeholder.split(/(\/)/g).map((p) => (
              <span className={p === "/" ? "slash" : "placeholder"}>{p}</span>
            ))}
          </span>
        </div>
      </Placeholder>
    </Container>
  );
});

const Container = styled("div")`
  position: relative;
  width: 100%;
`;

const Input = styled("input")`
  appearance: none;
  background: transparent;
  border: none;
  box-sizing: border-box;
  caret-color: #3c3c3c;
  color: rgba(60, 60, 60, 0);
  cursor: text;
  display: flex;
  font-family: ${AVENIR};
  font-size: 14px;
  justify-content: center;
  letter-spacing: 0px;
  line-height: 35px;
  margin: 0;
  outline: none;
  padding: 0;
  text-align: center;
  width: 100%;
`;

const Placeholder = styled("div")`
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;

  div {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  span {
    color: #3c3c3c;
    font-family: ${AVENIR};
    font-size: 14px;
    letter-spacing: 0px;
    line-height: 19px;
    text-align: center;
    text-shadow: 0 0 1px white, 0 0 2px white;
  }

  span.slash {
    color: #b1b1b1;
  }

  span.placeholder {
    color: #b1b1b1;
  }
`;
