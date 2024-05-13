import { forwardRef, ReactElement, SVGProps, LegacyRef } from "react";
import styled from "styled-components";

function CalendarBase(
  props: SVGProps<SVGSVGElement>,
  ref: LegacyRef<SVGSVGElement>,
): ReactElement {
  return (
    <svg width="26px" height="26px" viewBox="0 0 26 26" ref={ref} {...props}>
      <g>
        <g transform="translate(-572, -20)">
          <g transform="translate(574, 21)">
            <path d="M5.44557422,0 L5.44604297,4.44901479 L16.7373804,4.44901479 L16.7371766,0 L18.9731276,0 L18.9735148,4.44901479 L22,4.44893327 L22,23.2383114 L0,23.2383114 L0,4.44893327 L3.20990857,4.44901479 L3.20962324,0 L5.44557422,0 Z M19.7908163,8.63304082 L2.23918367,8.63304082 L2.23918367,21.0316122 L19.7908163,21.0316122 L19.7908163,8.63304082 Z M7.4150179,15.8514806 L7.4150179,18.8514806 L4.4150179,18.8514806 L4.4150179,15.8514806 L7.4150179,15.8514806 Z M12.5,15.85 L12.5,18.85 L9.5,18.85 L9.5,15.85 L12.5,15.85 Z M17.5897041,15.85 L17.5897041,18.85 L14.5897041,18.85 L14.5897041,15.85 L17.5897041,15.85 Z M7.4150179,10.8514806 L7.4150179,13.8514806 L4.4150179,13.8514806 L4.4150179,10.8514806 L7.4150179,10.8514806 Z M12.5,10.85 L12.5,13.85 L9.5,13.85 L9.5,10.85 L12.5,10.85 Z M17.5897041,10.85 L17.5897041,13.85 L14.5897041,13.85 L14.5897041,10.85 L17.5897041,10.85 Z"></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

const RefForwardingCalendar = forwardRef(CalendarBase);

export const Calendar = styled(RefForwardingCalendar).withConfig({
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
