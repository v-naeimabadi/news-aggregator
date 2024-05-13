/* eslint-disable no-restricted-syntax */
import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  useCallback,
  ReactElement,
} from "react";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import { TextInputPropsWeb } from "./text-input";
import {
  ADDRESS1_PROPS_WEB,
  BUSINESS_NAME_PROPS_WEB,
  DECIMAL_PROPS_WEB,
  EMAIL_PROPS_WEB,
  NAME_PROPS_WEB,
  NUMBER_PROPS_WEB,
  PASSWORD_PROPS_WEB,
  PHONE_NUMBER_PROPS_WEB,
  USERNAME_PROPS_WEB,
} from "./constants";

const ConnectedTextInput = forwardRef(function ConnectedTextInput(
  {
    connect,
    error: _error,
    required,
    min,
    max,
    maxLength,
    minLength,
    value,
    onChange,
    onBlur,
    onChangeText,
    disabled,
    type,
    ...props
  }: Omit<TextInputPropsWeb, "connect" | "ref"> &
    Required<Pick<TextInputPropsWeb, "connect">>,
  ref?: ForwardedRef<HTMLInputElement>,
) {
  const { register } = useFormContext();
  const { ref: rhfRef, ...rest } = register(connect, {
    required,
    min,
    max,
    maxLength,
    minLength,
    value,
    onChange,
    onBlur,
    disabled,
  });

  const handleChange = (newValue: string): void => {
    if (type !== "number") {
      if (onChangeText) onChangeText(newValue);
    }
  };

  return (
    <TextInputBase
      {...props}
      {...rest}
      onChangeText={handleChange}
      ref={(element) => {
        rhfRef(element);
        if (typeof ref === "function") {
          ref(element);
        } else if (ref) {
          ref.current = element;
        }
      }}
    />
  );
});

const TextInputBase = forwardRef(function TextInputBase(
  {
    error,
    multiline,
    numberOfLines,
    avoidKeyboard: _avoidKeyboard,
    type,
    onChange,
    onChangeText,
    autofocus: _autofocus,
    resize = true,
    ...props
  }: Omit<TextInputPropsWeb, "connect" | "ref">,
  ref?: ForwardedRef<HTMLInputElement>,
) {
  let typeProps: Omit<TextInputPropsWeb, "ref"> = {};
  switch (type) {
    case "number":
      typeProps = NUMBER_PROPS_WEB;
      break;
    case "decimal":
      typeProps = DECIMAL_PROPS_WEB;
      break;
    case "name":
      typeProps = NAME_PROPS_WEB;
      break;
    case "username":
      typeProps = USERNAME_PROPS_WEB;
      break;
    case "email":
      typeProps = EMAIL_PROPS_WEB;
      break;
    case "phone-number":
      typeProps = PHONE_NUMBER_PROPS_WEB;
      break;
    case "password":
      typeProps = PASSWORD_PROPS_WEB;
      break;
    case "address1":
      typeProps = ADDRESS1_PROPS_WEB;
      break;
    case "business-name":
      typeProps = BUSINESS_NAME_PROPS_WEB;
      break;
  }

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }
      if (!e.defaultPrevented && onChangeText) {
        onChangeText(e.target.value);
      }
    },
    [onChange, onChangeText],
  );

  return (
    <StyledTextInput
      as={multiline ? "textarea" : "input"}
      ref={ref}
      error={error}
      multiline={multiline}
      numberOfLines={numberOfLines}
      resize={resize}
      type={type === "password" ? "password" : multiline ? undefined : "text"}
      onChange={handleChange}
      {...typeProps}
      {...props}
    />
  );
});

export const TextInput = forwardRef(function TextInput(
  { connect, ...props }: Omit<TextInputPropsWeb, "ref">,
  ref?: ForwardedRef<HTMLInputElement>,
): ReactElement {
  if (connect) return <ConnectedTextInput connect={connect} {...props} />;
  return <TextInputBase ref={ref} {...props} />;
});

const StyledTextInput = styled("input").withConfig<{
  error?: boolean;
  resize?: TextInputPropsWeb["resize"];
  multiline?: boolean;
  numberOfLines?: number;
}>({
  shouldForwardProp: (prop) =>
    prop !== "error" &&
    prop !== "resize" &&
    prop !== "multiline" &&
    prop !== "numberOfLines",
})`
  box-sizing: border-box;
  background-color: white;
  border-color: ${({ error }) => (error ? "#FF3232" : "#c7c7c7")};
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  color: #3c3c3c;
  font-family: "Avenir Next", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  font-size: 14px;

  /* Fix issue on iOS safari where the text input would be bigger than 32px with avenir font */
  text-size-adjust: 90%;

  letter-spacing: 0px;
  line-height: 19px;
  outline: none;
  padding: 6px 11px 5px 11px;
  min-height: ${({ multiline, numberOfLines }) =>
    multiline && typeof numberOfLines === "number"
      ? `${13 + 19 * numberOfLines}px`
      : "32px"};
  &::placeholder {
    color: #9c9c9c;
  }
  &:hover:not([disabled]) {
    border-color: ${({ error }) => (error ? "#FF3232" : "#9c9c9c")};
  }
  &:focus:not([disabled]) {
    border-color: ${({ error }) => (error ? "#FF3232" : "#2271c3")};
  }
  &:disabled {
    opacity: 0.4;
  }
  width: 100%;
  ${({ resize, multiline }) =>
    multiline
      ? resize === "horizontal"
        ? `resize: horizontal;`
        : resize === "vertical"
        ? `resize: vertical;`
        : resize
        ? `resize: both;`
        : `resize: none;`
      : "resize: none;"}
`;
