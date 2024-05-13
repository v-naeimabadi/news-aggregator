import { ForwardedRef, forwardRef } from "react";
import styled, { css } from "styled-components";
import { TextProps, TextPropsWeb } from "./text";

export const Text = forwardRef(function Text(
  {
    fontSize = 14,
    letterSpacing = 0,
    lineHeight,
    textAlign = "left",
    fontWeight = 400,
    fontStyle = "normal",
    color = "#3C3C3C",
    title,
    ...props
  }: Omit<TextPropsWeb, "ref">,
  ref?: ForwardedRef<HTMLSpanElement>,
) {
  return (
    <StyledText
      ref={ref}
      fontSize={fontSize}
      letterSpacing={letterSpacing}
      lineHeight={
        typeof lineHeight === "number"
          ? lineHeight
          : Math.round(fontSize * 1.36)
      }
      textAlign={textAlign}
      fontWeight={fontWeight}
      fontStyle={fontStyle}
      color={color}
      title={title || undefined}
      {...props}
    />
  );
});

const StyledText = styled("span").withConfig<TextProps>({
  shouldForwardProp: (prop) =>
    prop !== "fontSize" &&
    prop !== "letterSpacing" &&
    prop !== "lineHeight" &&
    prop !== "textAlign" &&
    prop !== "fontWeight" &&
    prop !== "fontStyle" &&
    prop !== "color",
})(
  ({
    fontSize,
    letterSpacing,
    lineHeight,
    textAlign,
    fontWeight,
    fontStyle,
    color,
  }) => css`
    color: ${color};
    font-family: "Avenir Next", -apple-system, BlinkMacSystemFont, "Segoe UI",
      "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    font-size: ${fontSize}px;
    font-style: ${fontStyle};
    font-weight: ${fontWeight};
    letter-spacing: ${letterSpacing}px;
    line-height: ${lineHeight}px;
    text-align: ${textAlign};
  `,
);
