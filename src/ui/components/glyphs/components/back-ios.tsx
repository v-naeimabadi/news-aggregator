import { forwardRef, ReactElement, SVGProps, LegacyRef } from "react";
import styled from "styled-components";

function BackIosBase(
  props: SVGProps<SVGSVGElement>,
  ref: LegacyRef<SVGSVGElement>,
): ReactElement {
  return (
    <svg width="26px" height="26px" viewBox="0 0 26 26" ref={ref} {...props}>
      <g>
        <g transform="translate(-480, -20)">
          <g transform="translate(487.332, 23.7373)">
            <path d="M0,9.50683594 C0,9.69303385 0.0340169271,9.86490885 0.102050781,10.0224609 C0.170084635,10.180013 0.275716146,10.3304036 0.418945312,10.4736328 L8.78710938,18.6591797 C9.03059896,18.9026693 9.32421875,19.0244141 9.66796875,19.0244141 C9.90429688,19.0244141 10.1173503,18.9689128 10.3071289,18.8579102 C10.4969076,18.7469076 10.6490885,18.5965169 10.7636719,18.4067383 C10.8782552,18.2169596 10.9355469,18.007487 10.9355469,17.7783203 C10.9355469,17.4345703 10.8030599,17.1302083 10.5380859,16.8652344 L2.99707031,9.50683594 L10.5380859,2.1484375 C10.8030599,1.88346354 10.9355469,1.58268229 10.9355469,1.24609375 C10.9355469,1.00976562 10.8782552,0.798502604 10.7636719,0.612304688 C10.6490885,0.426106771 10.4969076,0.27750651 10.3071289,0.166503906 C10.1173503,0.0555013021 9.90429688,0 9.66796875,0 C9.32421875,0 9.03059896,0.118164062 8.78710938,0.354492188 L0.418945312,8.54003906 C0.275716146,8.68326823 0.170084635,8.83365885 0.102050781,8.99121094 C0.0340169271,9.14876302 0,9.32063802 0,9.50683594 Z"></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

const RefForwardingBackIos = forwardRef(BackIosBase);

export const BackIos = styled(RefForwardingBackIos).withConfig({
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
