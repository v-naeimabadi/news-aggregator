import { ReactElement, SVGProps } from "react";

export interface ActivityIndicatorProps extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}

export function ActivityIndicator(
  props: ActivityIndicatorProps,
): ReactElement | null;
