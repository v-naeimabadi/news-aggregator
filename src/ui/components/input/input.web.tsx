import { ForwardedRef, forwardRef, ReactElement } from "react";
import styled from "styled-components";
import { accessible } from "../../modules/accessibility";
import { AVENIR } from "../../constants/avenir.web";
import { Disclosure as DisclosureBase } from "./components/disclosure";
import { InputPropsWeb } from "./input";

function RefForwardingInput(
  {
    error,
    disabled,
    focused,
    selected,
    value,
    placeholder,
    accessory,
    onClick,
    children,
    label,
    ...props
  }: Omit<InputPropsWeb, "ref">,
  ref?: ForwardedRef<HTMLButtonElement>,
): ReactElement | null {
  const v = value || placeholder;
  label = typeof label === "string" ? label.trim() : label;
  return (
    <Container
      ref={ref}
      focused={!!focused}
      selected={!!selected}
      disabled={!!disabled}
      error={!!error}
      onClick={disabled ? undefined : onClick}
      type="button"
      {...props}
    >
      <ValueContainer>
        {typeof label === "string" && label ? (
          <Label color={disabled ? "#D8D8D8" : "#3C3C3C"}>{`${label}:`}</Label>
        ) : (
          label
        )}
        {typeof v === "string" ? (
          <Value
            color={
              disabled && value
                ? "#D8D8D8"
                : disabled
                ? "#EBEBEB"
                : value
                ? "#3C3C3C"
                : "#9C9C9C"
            }
          >
            {value || placeholder}
          </Value>
        ) : (
          v
        )}
      </ValueContainer>
      {children}
      {accessory === "disclosure" ? (
        <Disclosure
          focused={!!focused}
          selected={!!selected}
          disabled={!!disabled}
          error={!!error}
        />
      ) : null}
    </Container>
  );
}

interface ContainerProps {
  focused: boolean;
  selected: boolean;
  disabled: boolean;
  error: boolean;
}

const ContainerBase = styled("button").withConfig<ContainerProps>({
  shouldForwardProp: (prop) =>
    prop !== "focused" && prop !== "selected" && prop !== "error",
})`
  background-color: #fff;
  border: 1px solid
    ${({ focused, disabled, error }) =>
      disabled
        ? "#F4F4F4"
        : focused
        ? "#2271C3"
        : error
        ? "#FF3232"
        : "#c7c7c7"};
  border-radius: 4px;
  height: 32px;
  padding-left: 11px;
  padding-right: 11px;
  flex-direction: row;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  user-select: none;
  display: flex;

  &:hover {
    border: 1px solid
      ${({ focused, disabled }) =>
        disabled ? "#F4F4F4" : focused ? "#2271C3" : "#9C9C9C"};
  }

  &:active {
    border: 1px solid ${({ disabled }) => (disabled ? "#F4F4F4" : "#2271C3")};
  }
`;

const Container = accessible(ContainerBase);

const ValueContainer = styled("div")`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: flex-start;
  margin-top: 1px;
`;

const Value = styled("span").withConfig<{ color: string }>({
  shouldForwardProp: (prop) => prop !== "color",
})`
  color: ${({ color }) => color};
  font-family: ${AVENIR};
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 19px;
`;

const Label = styled("span").withConfig<{ color: string }>({
  shouldForwardProp: (prop) => prop !== "color",
})`
  color: ${({ color }) => color};
  font-family: ${AVENIR};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0px;
  line-height: 19px;
  &:after {
    content: "";
    display: inline-block;
    background: red;
    width: 4px;
  }
`;

const Disclosure = styled(DisclosureBase).withConfig<ContainerProps>({
  shouldForwardProp: (prop) =>
    prop !== "focused" &&
    prop !== "selected" &&
    prop !== "disabled" &&
    prop !== "error",
})`
  margin-left: 9px;
  margin-right: -1px;
  & * {
    fill: ${({ disabled, focused }) =>
      disabled ? "#D8D8D8" : focused ? "#2271C3" : "#3C3C3C"};
  }

  button:active & * {
    fill: ${({ disabled }) => (disabled ? "#D8D8D8" : "#2271C3")};
  }
`;

export const Input = forwardRef(RefForwardingInput);
