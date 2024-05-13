import styled, { css } from "styled-components";
import { accessible } from "../../../modules/accessibility";
import { AVENIR } from "../../../constants/avenir.web";

const TextButtonBase = styled("button").withConfig<{
  loading?: boolean;
  glyph: boolean;
}>({
  shouldForwardProp: (prop) =>
    prop !== "color" && prop !== "loading" && prop !== "glyph",
})(
  ({ disabled, color, loading }) => css`
    align-items: center;
    all: unset;
    background-color: #ffffff;
    border-radius: 4px;
    box-sizing: border-box;
    color: ${loading
      ? "transparent"
      : disabled
      ? "#C7C7C7"
      : color === "red"
      ? "#FF3232"
      : "#2271C3"};
    cursor: ${disabled ? "default" : "pointer"};
    display: flex;
    font-family: ${AVENIR};
    font-size: 14px;
    font-weight: 600;
    height: 32px;
    justify-content: center;
    line-height: 19px;
    max-width: fit-content;
    padding-bottom: 6px;
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 7px;
    text-decoration: none;

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
            color: ${color === "red" ? "#B51111" : "#0d549f"};
          }
          &:active {
            color: ${color === "red" ? "#540202" : "#003063"};
          }
        `
      : ""}
  `,
);

export const TextButton = accessible(TextButtonBase);
