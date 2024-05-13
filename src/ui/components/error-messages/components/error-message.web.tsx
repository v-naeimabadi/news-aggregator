/* eslint-disable no-restricted-syntax */
import { ReactElement } from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { ErrorMessageProps } from "./error-message";

export function ErrorMessage({
  name,
  message,
  ...props
}: ErrorMessageProps): ReactElement | null {
  const { formState } = useFormContext() || {};
  const { errors } = formState || {};
  if (name && errors && errors[name]) {
    return (
      <StyledErrorMessage {...props}>
        {errors[name]?.message as string}
      </StyledErrorMessage>
    );
  } else if (message) {
    return <StyledErrorMessage {...props}>{message}</StyledErrorMessage>;
  }
  return null;
}

const StyledErrorMessage = styled("span")`
  color: #ff3232;
  font-family: "Avenir Next", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 19px;
`;
