import { ReactElement, useEffect, useRef } from "react";
import { ActivityIndicatorProps } from "./activity-indicator";
import { startAnimation, stopAnimation } from "./animation/animation";

export function ActivityIndicator({
  color = "#2271C3",
  size = 26,
  ...props
}: ActivityIndicatorProps): ReactElement | null {
  const c1 = useRef<SVGCircleElement>(null);
  const c2 = useRef<SVGCircleElement>(null);
  const c3 = useRef<SVGCircleElement>(null);
  const c4 = useRef<SVGCircleElement>(null);
  const c5 = useRef<SVGCircleElement>(null);
  const c6 = useRef<SVGCircleElement>(null);
  const c7 = useRef<SVGCircleElement>(null);
  const c8 = useRef<SVGCircleElement>(null);

  useEffect((): void | (() => void) => {
    if (
      c1.current &&
      c2.current &&
      c3.current &&
      c4.current &&
      c5.current &&
      c6.current &&
      c7.current &&
      c8.current
    ) {
      const id = startAnimation(
        c1.current,
        c2.current,
        c3.current,
        c4.current,
        c5.current,
        c6.current,
        c7.current,
        c8.current,
      );
      return () => {
        stopAnimation(id);
      };
    }
  }, [c1, c2, c3, c4, c5, c6, c7, c8]);

  return (
    <svg
      width={size}
      height={size}
      x="0px"
      y="0px"
      viewBox="0 0 40 40"
      {...props}
    >
      <g fill={color} fillRule="evenodd">
        <circle ref={c1} cx="3" cy="20.5" r="1" fillOpacity="0" />
        <circle ref={c2} cx="5.25" cy="12" r="1.5" fillOpacity="0" />
        <circle ref={c3} cx="11.5" cy="5.75" r="2.5" fillOpacity="0" />
        <circle ref={c4} cx="20" cy="3.5" r="3" fillOpacity="0" />
        <circle ref={c5} cx="28.5" cy="5.75" r="3" fillOpacity="0" />
        <circle ref={c6} cx="34.75" cy="12" r="2.5" fillOpacity="0" />
        <circle ref={c7} cx="37" cy="20.5" r="1.5" fillOpacity="0" />
        <circle ref={c8} cx="35" cy="29" r="1" fillOpacity="0" />
      </g>
    </svg>
  );
}
