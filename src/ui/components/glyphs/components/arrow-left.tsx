import { forwardRef, ReactElement, SVGProps, LegacyRef } from "react";
import styled from "styled-components";

function ArrowLeftBase(
  props: SVGProps<SVGSVGElement>,
  ref: LegacyRef<SVGSVGElement>,
): ReactElement {
  return (
    <svg width="26px" height="26px" viewBox="0 0 26 26" ref={ref} {...props}>
      <g>
        <g transform="translate(-342, -20)">
          <g transform="translate(344.6, 24.79)">
            <polygon
              transform="translate(10.3955, 8.211) scale(-1, 1) translate(-10.3955, -8.211)"
              points="12.462 0 20.791 8.243 12.612 16.422 10.906 14.716 16.2035812 9.41886997 0 9.418 0 7.006 16.0533196 7.00613606 10.755 1.708"
            ></polygon>
          </g>
        </g>
      </g>
    </svg>
  );
}

const RefForwardingArrowLeft = forwardRef(ArrowLeftBase);

export const ArrowLeft = styled(RefForwardingArrowLeft).withConfig({
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
