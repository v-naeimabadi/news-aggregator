import { forwardRef, ReactElement, SVGProps, LegacyRef } from "react";
import styled from "styled-components";

function ArrowRightBase(
  props: SVGProps<SVGSVGElement>,
  ref: LegacyRef<SVGSVGElement>,
): ReactElement {
  return (
    <svg width="26px" height="26px" viewBox="0 0 26 26" ref={ref} {...props}>
      <g>
        <g transform="translate(-388, -20)">
          <g transform="translate(390.6, 24.79)">
            <polygon points="12.462 0 20.791 8.243 12.612 16.422 10.906 14.716 16.2035812 9.41886997 -5.68434189e-14 9.418 -5.68434189e-14 7.006 16.0533196 7.00613606 10.755 1.708"></polygon>
          </g>
        </g>
      </g>
    </svg>
  );
}

const RefForwardingArrowRight = forwardRef(ArrowRightBase);

export const ArrowRight = styled(RefForwardingArrowRight).withConfig({
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
