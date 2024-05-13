import { forwardRef, ReactElement, SVGProps, LegacyRef } from "react";
import styled from "styled-components";

function FilterClearBase(
  props: SVGProps<SVGSVGElement>,
  ref: LegacyRef<SVGSVGElement>,
): ReactElement {
  return (
    <svg width="26px" height="26px" viewBox="0 0 26 26" ref={ref} {...props}>
      <g>
        <g transform="translate(-802, -66)">
          <g transform="translate(803.5, 67.0889)">
            <path d="M6.17292143,0.749213187 L8.02728914,0 L17.202,22.717 L15.350783,23.4652176 L13.849,19.749 L12.872,17.336 L11.338,13.536 L10.362,11.124 L8.829,7.324 L7.851,4.911 L6.17292143,0.749213187 Z M10.714,17.336 L11.689,19.749 L7.5,19.7498267 L7.5,17.3369256 L10.714,17.336 Z M14.676,11.124 L19.5,11.1240245 L19.5,13.5369256 L15.65,13.536 L14.676,11.124 Z M8.204,11.124 L9.179,13.536 L3.5,13.5369256 L3.5,11.1240245 L8.204,11.124 Z M12.165,4.911 L23,4.91112333 L23,7.32402445 L13.14,7.324 L12.165,4.911 Z M5.694,4.911 L6.669,7.324 L0,7.32402445 L0,4.91112333 L5.694,4.911 Z"></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

const RefForwardingFilterClear = forwardRef(FilterClearBase);

export const FilterClear = styled(RefForwardingFilterClear).withConfig({
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
