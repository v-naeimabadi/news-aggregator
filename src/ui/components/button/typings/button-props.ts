import { ReactNode } from "react";
import { GlyphName } from "../../glyphs";

export interface ButtonProps {
  glyph?: GlyphName;
  glyphSize?: number;
  scheme?: "primary" | "green" | "red";
  size?: "normal" | "large" | "compact";
  variant?: "contained" | "text" | "outlined";
  disabled?: boolean;
  children: ReactNode | null | string;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
}
