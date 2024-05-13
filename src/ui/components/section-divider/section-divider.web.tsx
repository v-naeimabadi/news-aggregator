import { DetailedHTMLProps, HTMLAttributes, RefObject } from "react";
import styled from "styled-components";

export interface SectionDividerProps
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement>,
    "ref"
  > {
  color?: string;
  ref?: RefObject<HTMLHRElement>;
}

export function SectionDivider({
  color = "#E8E8E8",
  ...props
}: SectionDividerProps) {
  return <Divider {...props} color={color} />;
}

const Divider = styled("hr").withConfig<{ color: string }>({
  shouldForwardProp: (prop) => prop !== "color",
})`
  height: 1px;
  background-color: ${({ color }) => color};
  color: ${({ color }) => color};
  width: 100%;
  border: none;
`;
