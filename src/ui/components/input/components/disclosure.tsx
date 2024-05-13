import { ReactElement, SVGProps } from "react";

export function Disclosure(
  props: SVGProps<SVGSVGElement>,
): ReactElement | null {
  return (
    <svg width="16px" height="16px" viewBox="0 0 16 16" {...props}>
      <g transform="translate(0.000000, -3.000000)">
        <g transform="translate(2.000000, 7.000000)">
          <polygon points="12 2.30731575 9.69203155 0 6.00032635 3.69170519 2.30796845 0 0 2.30731575 3.6923579 5.99967365 3.6923579 5.99967365 6.00032635 8.30698939 8.3076421 5.99967365 8.3076421 5.99967365"></polygon>
        </g>
      </g>
    </svg>
  );
}
