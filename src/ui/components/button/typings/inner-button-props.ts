import { ReactNode } from "react";

export interface InnerButtonProps {
  state?: string;
  children?: ReactNode | string;
  leftGlyph?: ReactNode;
  glyph?: ReactNode;
  rightGlyph?: ReactNode;
}
