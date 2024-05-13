import { DetailedHTMLProps, FunctionComponent, HTMLAttributes } from "react";
import { ViewProps } from "react-native";

interface SectionDividerProps
  extends ViewProps,
    DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement> {
  color?: string;
}

export const SectionDivider: FunctionComponent<SectionDividerProps>;
