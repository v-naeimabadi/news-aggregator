import styled, { css } from "styled-components";
import { accessible } from "../../../modules/accessibility";
import { AVENIR } from "../../../constants/avenir.web";

const OutlinedButtonBase = styled("button").withConfig<{
  loading?: boolean;
  glyph: boolean;
}>({
  shouldForwardProp: (prop) =>
    prop !== "color" && prop !== "loading" && prop !== "glyph",
})(
  ({ disabled, color, loading, glyph }) => css`
    all: unset;
    align-items: center;
    border-radius: 4px;
    cursor: ${disabled ? "default" : "pointer"};
    display: flex;
    font-family: ${AVENIR};
    font-size: 14px;
    font-weight: 600;
    height: 32px;
    box-sizing: border-box;
    // Account for border
    padding-top: 6px;
    padding-bottom: 5px;
    padding-left: ${glyph ? "7px" : "15px"};
    padding-right: ${glyph ? "7px" : "15px"};
    justify-content: center;
    max-width: fit-content;
    text-decoration: none;
    border: ${disabled ? "1px solid #C7C7C7" : "1px solid #C7C7C7"};
    background-color: #ffffff;
    color: ${loading
      ? "transparent"
      : disabled
      ? "#C7C7C7"
      : color === "red"
      ? "#FF3232"
      : "#2271C3"};

    & svg * {
      fill: ${loading
        ? "transparent"
        : disabled
        ? "#C7C7C7"
        : color === "red"
        ? "#FF3232"
        : "#2271C3"};
    }

    ${!disabled
      ? css`
          &:hover svg * {
            fill: ${color === "red" ? "#B51111" : "#0d549f"};
          }
          &:active svg * {
            fill: ${color === "red" ? "#540202" : "#003063"};
          }
        `
      : ""}

    ${!disabled
      ? css`
          &:hover {
            background-color: #e8e8e8;
            border: 1px solid #b1b1b1;
            color: ${color === "red" ? "#B51111" : "#0d549f"};
          }
          &:active {
            background-color: #c7c7c7;
            border: 1px solid #9c9c9c;
            color: ${color === "red" ? "#540202" : "#003063"};
          }
        `
      : ""}
  `,
);

export const OutlinedButton = accessible(OutlinedButtonBase);
