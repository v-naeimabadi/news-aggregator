import { ReactElement } from "react";
import styled from "styled-components";
import { LoadingState } from "../loading-state/loading-state.web";
import { LoadingStateScreenPropsWeb } from "./loading-state-screen";

export function LoadingStateScreen(
  props: LoadingStateScreenPropsWeb,
): ReactElement | null {
  return (
    <Container {...props}>
      <LoadingState />
    </Container>
  );
}

const Container = styled("div")`
  align-items: center;
  background-color: white;
  display: flex;
  justify-content: center;
  min-height: 100%;
`;
