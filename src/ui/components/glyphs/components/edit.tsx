import { forwardRef, ReactElement, SVGProps, LegacyRef } from "react";
import styled from "styled-components";

function EditBase(
  props: SVGProps<SVGSVGElement>,
  ref: LegacyRef<SVGSVGElement>,
): ReactElement {
  return (
    <svg width="26px" height="26px" viewBox="0 0 26 26" ref={ref} {...props}>
      <g>
        <g transform="translate(-434, -66)">
          <g transform="translate(436.12, 68.12)">
            <path d="M15.9100718,0 L21.7560763,5.84599419 L21.7560763,6.05811592 L6.1020705,21.7151616 L5.99599419,21.7591059 L0.15,21.7591059 L0,21.6091059 L0,15.7631117 L0.0439236859,15.657056 L15.6979295,0 L15.9100718,0 Z M2.458,17.018066 L2.458,19.298066 L4.738,19.298066 L2.458,17.018066 Z M13.105,6.07106602 L4.047,15.129066 L6.626,17.709066 L15.685,8.65106602 L13.105,6.07106602 Z M15.805,3.37206602 L14.845,4.33306602 L17.425,6.91306602 L18.385,5.95206602 L15.805,3.37206602 Z"></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

const RefForwardingEdit = forwardRef(EditBase);

export const Edit = styled(RefForwardingEdit).withConfig({
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
