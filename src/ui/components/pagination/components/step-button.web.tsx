import styled from "styled-components";
import {
  DetailedHTMLProps,
  ButtonHTMLAttributes,
  RefObject,
  useCallback,
  MouseEvent,
  KeyboardEvent,
} from "react";
import { AVENIR } from "../../../constants/avenir.web";
import { accessible } from "../../../modules/accessibility";

interface StepButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  disabled?: boolean;
  step?: string;
  ref?: RefObject<HTMLButtonElement>;
  isActive?: boolean;
  onChangeStep?: (value: string) => unknown;
}

export const StepButton = ({
  disabled,
  onChangeStep,
  onKeyDown,
  onClick,
  step,
  isActive,
  ...props
}: StepButtonProps) => {
  const handleMouseClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>, value: string) => {
      if (onChangeStep) {
        onChangeStep(value);
      }

      if (onClick) {
        onClick(e);
      }
    },
    [onChangeStep, onClick]
  );

  const handleKeyboardClick = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, value: string) => {
      if (onChangeStep) {
        onChangeStep(value);
      }

      if (onKeyDown) {
        onKeyDown(e);
      }
    },
    [onChangeStep, onKeyDown]
  );

  return (
    <AccessibleStepButton
      {...props}
      onClick={(e: MouseEvent<HTMLButtonElement>) => {
        if (!disabled && step) {
          handleMouseClick(e, step);
        }
      }}
      onKeyDown={(e: KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === "Enter" && !disabled && step) {
          handleKeyboardClick(e, step);
        }
      }}
      disabled={disabled}
      isActive={isActive}
      type="button"
    >
      {step}
    </AccessibleStepButton>
  );
};

const StyledStepButton = styled("button").withConfig<{
  isActive?: boolean;
  disabled?: boolean;
}>({
  shouldForwardProp: (prop) => prop !== "isActive" && prop !== "disabled",
})`
  background-color: ${({ isActive, theme }) =>
    isActive ? "#808080" : "#d8d9d8"};
  border: none;
  border-radius: 50%;
  color: ${({ isActive, theme }) =>
    isActive ? "#ffffff" : "#808080"};
  cursor: ${({ disabled }) => (disabled ? "auto" : "pointer")};
  font-family: ${AVENIR};
  font-weight: 600;
  height: 24px;
  margin: 0;
  padding: 0;
  width: 24px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  &:hover {
    background-color: ${({ isActive, disabled, theme }) =>
      disabled
        ? null
        : isActive
        ? "#1976d2"
        : "#d8d9d8"};
    color: ${({ isActive, disabled, theme }) =>
      disabled
        ? null
        : isActive
        ? "#ffffff"
        : "#A9A9A9"};
  }
  &:active {
    background-color: ${({ disabled, isActive, theme }) =>
      disabled
        ? null
        : isActive
        ? "#808080"
        : "#A9A9A9"};
    color: ${({ disabled, isActive, theme }) =>
      disabled
        ? null
        : isActive
        ? "#ffffff"
        : "#A9A9A9"};
  }
`;

const AccessibleStepButton = accessible(StyledStepButton);
