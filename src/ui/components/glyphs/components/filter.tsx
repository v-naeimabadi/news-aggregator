import { forwardRef, ReactElement, SVGProps, LegacyRef } from "react";
import styled from "styled-components";

function FilterBase(
  props: SVGProps<SVGSVGElement>,
  ref: LegacyRef<SVGSVGElement>,
): ReactElement {
  return (
    <svg width="26px" height="26px" viewBox="0 0 26 26" ref={ref} {...props}>
      <g>
        <g transform="translate(-756, -66)">
          <g transform="translate(757.5, 70.35)">
            <path d="M0,0 L23,0 L23,2.41290113 L0,2.41290113 L0,0 Z M3.5,7.43718741 L19.5,7.43718741 L19.5,9.85008853 L3.5,9.85008853 L3.5,7.43718741 Z M7.5,14.8743453 L15.5,14.8743453 L15.5,17.2872464 L7.5,17.2872464 L7.5,14.8743453 Z"></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

const RefForwardingFilter = forwardRef(FilterBase);

export const Filter = styled(RefForwardingFilter).withConfig({
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
