import { ReactElement, SVGProps } from "react";
import { GlyphName } from "./typings/glyph-name";

export interface GlyphPropsBase {
  name: GlyphName;
  color?: string;
  size?: number;
}

export interface GlyphPropsWeb
  extends GlyphPropsBase,
    SVGProps<SVGSVGElement> {}

export type GlyphProps = GlyphPropsWeb;

export function Glyph<PlatformProps extends GlyphProps = GlyphProps>(
  props: PlatformProps,
): ReactElement | null;
