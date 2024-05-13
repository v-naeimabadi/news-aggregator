import { forwardRef, ReactElement, SVGProps, LegacyRef } from "react";
import styled from "styled-components";

function ReportsBase(
  props: SVGProps<SVGSVGElement>,
  ref: LegacyRef<SVGSVGElement>,
): ReactElement {
  return (
    <svg width="26px" height="26px" viewBox="0 0 26 26" ref={ref} {...props}>
      <g>
        <g transform="translate(-572, -158)">
          <g transform="translate(574, 160)">
            <path d="M2.23268494,0 L2.23268494,19.7672077 L21.9993659,19.7672077 L21.9993659,21.9993912 L0,21.9993912 L0,0 L2.23268494,0 Z M13.2389029,1.54030918 L13.2389029,18.046686 L10.8260018,18.046686 L10.8260018,1.54030918 L13.2389029,1.54030918 Z M7.801745,10.5403092 L7.801745,18.046686 L5.38884387,18.046686 L5.38884387,10.5403092 L7.801745,10.5403092 Z M18.6760903,4.89045762 L18.6760903,18.0403092 L16.2631892,18.0403092 L16.2631892,4.89045762 L18.6760903,4.89045762 Z"></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

const RefForwardingReports = forwardRef(ReportsBase);

export const Reports = styled(RefForwardingReports).withConfig({
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
