import { ForwardedRef, forwardRef, ReactElement, Fragment } from "react";
import styled from "styled-components";
import { PaginationProps } from "./typings/pagination-props";
import { StepButton } from "./components/step-button.web";

export const Pagination = forwardRef(function Pagination(
  { disabled, onChangeStep, steps, selectedStep, ...props }: PaginationProps,
  ref: ForwardedRef<HTMLDivElement>
): ReactElement | null {
  return (
    <PaginationContainer {...props} ref={ref}>
      {steps && steps.length > 0
        ? steps.map((step: string, index: number) => (
            <Fragment key={`steps-${index}`}>
              <StepButton
                disabled={typeof disabled === "boolean" ? disabled : undefined}
                isActive={selectedStep === step}
                onChangeStep={onChangeStep}
                step={step}
              />
              {index !== steps.length - 1 ? <Bar /> : null}
            </Fragment>
          ))
        : null}
    </PaginationContainer>
  );
});

const PaginationContainer = styled("div")`
  align-items: center;
  background-color: #fff;
  border: none;
  color: #333;
  display: flex;
  gap: 0px 4px;
  outline: none;
`;

const Bar = styled("div")`
  background-color: #d8d9d8;
  height: 1px;
  width: 22px;
`;
