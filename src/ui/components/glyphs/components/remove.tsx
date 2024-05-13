import { forwardRef, ReactElement, SVGProps, LegacyRef } from "react";
import styled from "styled-components";

function RemoveBase(
  props: SVGProps<SVGSVGElement>,
  ref: LegacyRef<SVGSVGElement>,
): ReactElement {
  return (
    <svg width="26px" height="26px" viewBox="0 0 26 26" ref={ref} {...props}>
      <g>
        <g transform="translate(-526, -158)">
          <g transform="translate(530, 162)">
            <polygon points="18 1.69955357 16.3004464 0 9.03873214 7.26171429 1.69955357 0 0 1.69955357 7.26171429 9.03873214 0 16.3004464 1.69955357 18 9.03873214 10.7382857 16.3004464 18 18 16.3004464 10.7382857 9.03873214"></polygon>
          </g>
        </g>
      </g>
    </svg>
  );
}

const RefForwardingRemove = forwardRef(RemoveBase);

export const Remove = styled(RefForwardingRemove).withConfig({
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
