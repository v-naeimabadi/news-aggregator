import { forwardRef, ReactElement, SVGProps, LegacyRef } from "react";
import styled from "styled-components";

function UploadBase(
  props: SVGProps<SVGSVGElement>,
  ref: LegacyRef<SVGSVGElement>,
): ReactElement {
  return (
    <svg width="26px" height="26px" viewBox="0 0 26 26" ref={ref} {...props}>
      <g>
        <g transform="translate(-296, -204)">
          <g transform="translate(299.6, 205.6055)">
            <path d="M1.1845,8.329 L9.4275,0 L17.6065,8.179 L15.9005,9.885 L10.60337,4.58741884 L10.6025,17.791 L8.1905,17.791 L8.19063606,4.73768044 L2.8925,10.036 L1.1845,8.329 Z M18.8,22.60337 L0,22.6025 L0,20.1905 L18.8,20.1906361 L18.8,22.60337 Z"></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

const RefForwardingUpload = forwardRef(UploadBase);

export const Upload = styled(RefForwardingUpload).withConfig({
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
