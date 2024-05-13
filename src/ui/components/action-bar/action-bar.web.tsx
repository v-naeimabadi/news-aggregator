import styled from "styled-components";
import { ActionBarPropsWeb } from "./typings/action-bar-props";

export function ActionBar({
  backgroundColor = "white",
  leftContent,
  rightContent,
  ...props
}: ActionBarPropsWeb) {
  return (
    <Container backgroundColor={backgroundColor} {...props}>
      <div>{leftContent}</div>
      <div>{rightContent}</div>
    </Container>
  );
}

const Container = styled("div").withConfig<{
  backgroundColor: string;
}>({
  shouldForwardProp: (prop) => prop !== "backgroundColor",
})`
  align-items: center;
  display: flex;
  border-top: 1px solid #d8d9d8;
  background-color: ${({ backgroundColor }) => backgroundColor};
  height: 56px;
  padding-inline: 16px;
  justify-content: space-between;
  bottom: 0;
  right: 0;
  position: fixed;
  width: 100%;
`;
