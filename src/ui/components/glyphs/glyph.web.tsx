import { ReactElement } from "react";
import glyphsMap from "./components";
import { GlyphPropsWeb } from "./glyph";

export function Glyph({
  name,
  size = 16,
  color = "#000000",
  ...props
}: GlyphPropsWeb): ReactElement | null {
  const Component = glyphsMap[name];
  if (Component) {
    return <Component width={size} height={size} color={color} {...props} />;
  }
  return null;
}
