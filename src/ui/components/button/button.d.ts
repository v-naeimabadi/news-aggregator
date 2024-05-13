import { ComponentType, FunctionComponent, ReactElement } from "react";
import { PressableProps, ViewStyle } from "react-native";
import { To } from "react-router";
import { GlyphName } from "../glyphs";
import { ModalOptions } from "../modals/typings/modal-options";
import { ModalOptions as ModalOptionsNext } from "../modals-next/typings/modal-options";

type ButtonPropsE<
  A extends string | ComponentType<never> | FunctionComponent<never>,
> = A extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[A]
  : A extends ComponentType<infer P>
  ? P
  : A extends FunctionComponent<infer P>
  ? P
  : {};

export type ButtonProps<A extends string | ComponentType | FunctionComponent> =
  {
    as?: A;
    /**
     * When true, the link will open in a side sheet.
     */
    sideSheet?: boolean;
    /**
     * When true, the link will open in a modal.
     */
    modal?: boolean;
    /**
     * When true, the link will open in a modal.
     */
    nextModal?: boolean;
    /**
     * When true, the link will open in a modal.
     */
    modalOptions?: ModalOptions;
    /**
     * When true, the link will open in a modal.
     */
    nextModalOptions?: ModalOptionsNext;
    /**
     * When true, clicking the link will replace the current entry in the history stack instead of adding a new one.
     */
    replace?: boolean;
    /**
     * A string representation of the Link location, created by concatenating the location’s pathname, search, and hash properties.
     */
    to?: To;
    /**
     * Data to associate with the new location.
     */
    state?: unknown;
    /**
     * Variant of the button.
     */
    variant?: "contained" | "outlined" | "text";
    /**
     * The glyph to the left of the label.
     */
    leftGlyph?: GlyphName | ReactElement | null;
    /**
     * The glyph to the right of the label.
     */
    rightGlyph?: GlyphName | ReactElement | null;
    /**
     * The glyph when there is no label.
     */
    glyph?: GlyphName | ReactElement | null;
    /**
     * When true, the button is disabled.
     */
    disabled?: boolean;
    /**
     * When true, an activity indicator appears over the button.
     */
    loading?: boolean;
    /**
     * Color of the button
     */
    color?: "primary" | "red";
    buttonStyle?: ViewStyle;
  } & ButtonPropsE<A> &
    Omit<PressableProps, "style">;

export function Button<
  A extends string | ComponentType<never> | FunctionComponent<never> = "button",
>(props: ButtonProps<A>): ReactElement | null;
