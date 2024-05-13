import styled from "styled-components";
import { ActivityIndicator } from "../../activity-indicator";

interface Props {
  variant: "contained" | "outlined" | "text";
}

export function Loader({ variant }: Props) {
  return (
    <Container variant={variant}>
      <ActivityIndicator />
    </Container>
  );
}

const Container = styled("div").withConfig<Props>({
  shouldForwardProp: (prop) => prop !== "variant",
})`
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;

  & svg * {
    fill: ${({ variant }) =>
      variant === "contained" ? "white" : "#C7C7C7"} !important;
  }
`;
