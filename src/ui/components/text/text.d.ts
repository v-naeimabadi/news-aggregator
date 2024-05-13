import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  PropsWithChildren,
  ReactElement,
} from "react";
import { TextProps as RNTextProps } from "react-native";

export interface TextPropsBase extends PropsWithChildren {
  fontSize?: number;
  letterSpacing?: number;
  lineHeight?: number;
  textAlign?: "left" | "right" | "center";
  fontWeight?: 300 | 400 | 500 | 600 | 700 | 900;
  fontStyle?: "normal" | "italic";
  color?: string;
  title?: string | null;
}

export interface TextPropsWeb
  extends TextPropsBase,
    DetailedHTMLProps<InputHTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {}

export interface TextPropsNative extends TextPropsBase, RNTextProps {}

export type TextProps = TextPropsWeb | TextPropsNative;

export function Text<PlatformProps extends TextProps = TextProps>(
  props: PlatformProps,
): ReactElement | null;
