import { ReactElement } from "react";
import styled from "styled-components";
import { ActivityIndicator } from "../activity-indicator";
import { LoadingStatePropsWeb } from "./loading-state";

export function LoadingState({
  ...props
}: Omit<LoadingStatePropsWeb, "ref">): ReactElement | null {
  return (
    <Container {...props}>
      <ActivityIndicator />
    </Container>
  );
}

const Container = styled("div")`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`;
