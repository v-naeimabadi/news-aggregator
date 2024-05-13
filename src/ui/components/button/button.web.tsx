import {
  createElement,
  ForwardedRef,
  forwardRef,
  MouseEvent,
  ReactElement,
  useCallback,
} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Glyph } from "../glyphs/glyph.web";
import { GlyphName } from "../glyphs/typings/glyph-name";
import { ButtonProps } from "./button";
import { ContainedButton } from "./components/contained-button.web";
import { OutlinedButton } from "./components/outlined-button.web";
import { TextButton } from "./components/text-button.web";
import { Loader } from "./components/loader.web";

export const Button = forwardRef(function Button(
  {
    variant = "contained",
    color,
    onClick,
    sideSheet,
    modal,
    modalOptions,
    nextModal,
    nextModalOptions,
    replace: doReplace,
    to,
    state,
    as: asProp,
    glyph,
    leftGlyph,
    rightGlyph,
    disabled,
    children,
    loading,
    ...props
  }: Omit<ButtonProps<"button">, "ref">,
  ref: ForwardedRef<HTMLButtonElement | HTMLAnchorElement>
): ReactElement | null {
  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (onClick) onClick(e);
      if (!e.defaultPrevented && to && !e.altKey && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
      }
    },
    [onClick, to]
  );

  const glyphCount =
    0 + (glyph ? 1 : 0) + (leftGlyph ? 1 : 0) + (rightGlyph ? 1 : 0);

  return createElement(
    variant === "outlined"
      ? OutlinedButton
      : variant === "text"
      ? TextButton
      : ContainedButton,
    {
      ref,
      color,
      disabled: loading || disabled,
      loading: loading,
      as: asProp || to ? Link : "button",
      to: to,
      replace: doReplace,
      glyph: !!(glyphCount === 1 && !children),
      onClick: !disabled
        ? (sideSheet || modal || nextModal) && to
          ? handleClick
          : onClick
        : undefined,
      ...props,
    },
    <>
      {glyph ? (
        <GlyphContainer
          style={{
            marginRight: children ? 8 : 0,
          }}
          data-testid="glyph"
        >
          {typeof glyph === "string" ? (
            <Glyph name={glyph as GlyphName} size={16} />
          ) : (
            glyph
          )}
        </GlyphContainer>
      ) : null}
      {leftGlyph ? (
        <GlyphContainer
          style={{
            marginRight: children ? 8 : 0,
          }}
          data-testid="left-glyph"
        >
          {typeof leftGlyph === "string" ? (
            <Glyph name={leftGlyph as GlyphName} size={16} />
          ) : (
            leftGlyph
          )}
        </GlyphContainer>
      ) : null}
      {children}
      {rightGlyph ? (
        <GlyphContainer
          style={{ marginLeft: children ? 8 : 0 }}
          data-testid="right-glyph"
        >
          {typeof rightGlyph === "string" ? (
            <Glyph name={rightGlyph as GlyphName} size={16} />
          ) : (
            rightGlyph
          )}
        </GlyphContainer>
      ) : null}
      {loading ? <Loader variant={variant} /> : null}
    </>
  );
});

const GlyphContainer = styled("div")`
  align-items: center;
  display: flex;
  transform: translateY(-0.5px);
`;
