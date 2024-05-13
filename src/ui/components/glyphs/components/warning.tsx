import { forwardRef, ReactElement, SVGProps, LegacyRef } from "react";
import styled from "styled-components";

function WarningBase(
  props: SVGProps<SVGSVGElement>,
  ref: LegacyRef<SVGSVGElement>,
): ReactElement {
  return (
    <svg width="26px" height="26px" viewBox="0 0 26 26" ref={ref} {...props}>
      <g>
        <g transform="translate(-342, -204)">
          <g transform="translate(342, 204)">
            <path d="M13,0 L26,24 L0,24 L13,0 Z M13,5.039 L4.029,21.6 L21.97,21.6 L13,5.039 Z M12,18 L14.4,18 L14.4,20 L12,20 Z M12,11 L14.4,11 L14.4,17 L12,17 Z"></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

const RefForwardingWarning = forwardRef(WarningBase);

export const Warning = styled(RefForwardingWarning).withConfig({
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
