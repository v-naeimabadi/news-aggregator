import { forwardRef, ReactElement, SVGProps, LegacyRef } from "react";
import styled from "styled-components";

function AppsBase(
  props: SVGProps<SVGSVGElement>,
  ref: LegacyRef<SVGSVGElement>,
): ReactElement {
  return (
    <svg width="26px" height="26px" viewBox="0 0 26 26" ref={ref} {...props}>
      <g>
        <g transform="translate(-296, -20)">
          <g transform="translate(298, 21.136)">
            <path d="M9,13.863961 L9,22.863961 L0,22.863961 L0,13.863961 L9,13.863961 Z M20,13.863961 L20,22.863961 L11,22.863961 L11,13.863961 L20,13.863961 Z M18,15.863 L13,15.863 L13,20.863 L18,20.863 L18,15.863 Z M7,15.863 L2,15.863 L2,20.863 L7,20.863 L7,15.863 Z M16.5,3.55271368e-15 L22.863961,6.36396103 L16.5,12.7279221 L10.136039,6.36396103 L16.5,3.55271368e-15 Z M9,2.86396103 L9,11.863961 L0,11.863961 L0,2.86396103 L9,2.86396103 Z M16.5,2.829 L12.965,6.364 L16.5,9.899 L20.035,6.364 L16.5,2.829 Z M7,4.863 L2,4.863 L2,9.863 L7,9.863 L7,4.863 Z"></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

const RefForwardingApps = forwardRef(AppsBase);

export const Apps = styled(RefForwardingApps).withConfig({
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
