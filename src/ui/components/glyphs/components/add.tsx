import { forwardRef, ReactElement, SVGProps, LegacyRef } from "react";
import styled from "styled-components";

function AddBase(
  props: SVGProps<SVGSVGElement>,
  ref: LegacyRef<SVGSVGElement>,
): ReactElement {
  return (
    <svg width="26px" height="26px" viewBox="0 0 26 26" ref={ref} {...props}>
      <g>
        <g transform="translate(-20, -20)">
          <g transform="translate(21.4738, 21.4738)">
            <polygon points="23.0523124 12.7279221 23.0523124 10.3243904 12.7826976 10.3243904 12.7279221 4.4408921e-16 10.3243904 0 10.2696148 10.3243904 3.55271368e-15 10.3243904 0 12.7279221 10.3243904 12.7826976 10.3243904 23.0523124 12.7279221 23.0523124 12.7279221 12.7826976"></polygon>
          </g>
        </g>
      </g>
    </svg>
  );
}

const RefForwardingAdd = forwardRef(AddBase);

export const Add = styled(RefForwardingAdd).withConfig({
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
