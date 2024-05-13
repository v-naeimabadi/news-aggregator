import styled, { css } from "styled-components";
import { accessible } from "../../../modules/accessibility";
import { AVENIR } from "../../../constants/avenir.web";

const ContainedButtonBase = styled("button").withConfig<{
  loading?: boolean;
  glyph: boolean;
}>({
  shouldForwardProp: (prop) =>
    prop !== "color" && prop !== "loading" && prop !== "glyph",
})(
  ({ disabled, color, loading, glyph }) => css`
    align-items: center;
    all: unset;
    background-color: ${disabled
      ? "#C7C7C7"
      : color === "red"
      ? "#FF3232"
      : "#2271C3"};
    border: none;
    border-radius: 4px;
    box-sizing: border-box;
    color: ${loading ? "transparent" : "white"};
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
    padding-left: ${glyph ? "8px" : "16px"};
    padding-right: ${glyph ? "8px" : "16px"};
    padding-top: 7px;
    text-decoration: none;

    & svg * {
      fill: ${loading ? "transparent" : "white"};
    }

    ${!disabled
      ? css`
          &:hover {
            background-color: ${color === "red" ? "#B51111" : "#0d549f"};
          }
          &:active {
            background-color: ${color === "red" ? "#540202" : "#003063"};
          }
        `
      : ""}
  `,
);

export const ContainedButton = accessible(ContainedButtonBase);
