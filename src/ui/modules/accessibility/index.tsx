import styled, { css } from "styled-components";
import { ComponentType } from "react";

const Outline = css`
  &:before {
    border: 2px solid #ffc800;
    bottom: 0px;
    content: "";
    display: block;
    left: 0px;
    pointer-events: none;
    position: absolute;
    right: 0px;
    top: 0px;
    z-index: 1000;
  }
`;

const OutlineInset = (inset: number) => css`
  &:before {
    border: 2px solid #ffc800;
    bottom: ${inset * -1}px;
    content: "";
    display: block;
    left: ${inset * -1}px;
    pointer-events: none;
    position: absolute;
    right: ${inset * -1}px;
    top: ${inset * -1}px;
    z-index: 1000;
  }
`;

const Focus = css`
  outline: none;
  position: relative;

  &:focus,
  &:focus:active {
    &:before {
      display: none;
    }
  }

  &:focus {
    ${Outline};
  }
`;

const FocusInset = (inset?: number) => css`
  outline: none;
  position: relative;

  &:focus,
  &:focus:active {
    &:before {
      display: none;
    }
  }

  &:focus {
    ${OutlineInset(inset || 0)};
  }
`;

interface AccessibleOptions {
  insetBorder?: number;
}

export function accessible<C>(Component: C, options?: AccessibleOptions): C {
  if (typeof options?.insetBorder === "number" && options.insetBorder !== 0) {
    return styled(Component as unknown as ComponentType)
      .withConfig<{ disableOutline?: boolean; "data-focus"?: "true" }>({
        shouldForwardProp: (prop) => prop !== "disableOutline",
      })
      .attrs({
        "data-focus": "true",
      })`
      outline: none;
      position: relative;

      &:focus,
      &:focus:active {
        &:before {
          display: none;
        }
      }

      &:focus {
        ${({ disableOutline }) =>
          disableOutline ? "" : `${FocusInset(options.insetBorder)};`}
      }
    ` as unknown as C;
  }
  return styled(Component as unknown as ComponentType)
    .withConfig<{ disableOutline?: boolean; "data-focus"?: "true" }>({
      shouldForwardProp: (prop) => prop !== "disableOutline",
    })
    .attrs({
      "data-focus": "true",
    })`
    outline: none;
    position: relative;

    &:focus,
    &:focus:active {
      &:before {
        display: none;
      }
    }

    &:focus {
      ${({ disableOutline }) => (disableOutline ? "" : `${Outline};`)}
    }
  ` as unknown as C;
}

export * from "./focus-handler";

export const Accessibility = {
  Focus,
  Outline,
};
