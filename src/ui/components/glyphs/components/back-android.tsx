import { forwardRef, ReactElement, SVGProps, LegacyRef } from "react";
import styled from "styled-components";

function BackAndroidBase(
  props: SVGProps<SVGSVGElement>,
  ref: LegacyRef<SVGSVGElement>,
): ReactElement {
  return (
    <svg width="26px" height="26px" viewBox="0 0 26 26" ref={ref} {...props}>
      <g>
        <g transform="translate(-434, -20)">
          <g transform="translate(441, 24)">
            <polygon points="9 0 11.115 2.115 4.245 9 11.115 15.885 9 18 0 9"></polygon>
          </g>
        </g>
      </g>
    </svg>
  );
}

const RefForwardingBackAndroid = forwardRef(BackAndroidBase);

export const BackAndroid = styled(RefForwardingBackAndroid).withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !["width", "height", "color"].includes(prop) && defaultValidatorFn(prop),
})<{
  height: number;
  width: number;
  color: string;
}>`
  height: ${({ height }) => `${height}px`};
  width: ${({ width }) => `${width}px`};
  & > * {
    fill: ${({ color }) => color} !important;
  }
`;
