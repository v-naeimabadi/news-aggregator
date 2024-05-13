import { FunctionComponent } from "react";
import { useFormState } from "react-hook-form";
import styled from "styled-components";
import { LabelPropsWeb } from "./label";

function ConnectedLabel({
  connect,
  error,
  ...props
}: Omit<LabelPropsWeb, "connect"> & Required<Pick<LabelPropsWeb, "connect">>) {
  const { errors } = useFormState({ name: connect, exact: true });
  return <LabelBase error={error || !!errors[connect]} {...props} />;
}

function LabelBase({
  required,
  children,
  color,
  error,
  containerStyle,
  ...props
}: Omit<LabelPropsWeb, "connect" | "ref">) {
  return (
    <Container style={containerStyle}>
      <StyledLabel color={error ? "#FF3232" : color} {...props}>
        {children}
      </StyledLabel>
      {required ? (
        <RequiredIcon data-testid="label-required-icon">*</RequiredIcon>
      ) : null}
    </Container>
  );
}

export const Label: FunctionComponent<LabelPropsWeb> = ({
  connect,
  ...props
}) => {
  if (connect) return <ConnectedLabel connect={connect} {...props} />;
  return <LabelBase {...props} />;
};

const StyledLabel = styled("label")<{ color?: string }>`
  color: ${({ color }) => color || "#3c3c3c"};
  font-family: "Avenir Next", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0px;
  line-height: 19px;
  margin-bottom: 6px;
  margin-right: 6px;
  text-align: left;
`;

const RequiredIcon = styled("span")`
  color: #ff3232;
  font-family: "Avenir Next", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  font-size: 20px;
  font-weight: 700;
  margin-left: -1px;
  margin-top: -1px;
`;

const Container = styled("div")`
  display: flex;
  height: fit-content;
  justify-content: flex-start;
`;
