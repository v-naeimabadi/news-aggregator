import {
  forwardRef,
  ReactElement,
  ForwardedRef,
  useLayoutEffect,
  useMemo,
  useState,
  RefObject,
} from "react";
import styled from "styled-components";
import { ActionBar } from "../../../action-bar/action-bar.web";
import { Pagination } from "../../../../components/pagination/pagination.web";
import { useFilterQuery } from "../../hooks/use-filter-query";
import { Button } from "../../../../components/button/button.web";
import { TablePaginationProps } from "./table-pagination";

const DEFAULT_STEP_LENGTH = 3;

function RefForwardingTablePagination(
  { totalPages }: Omit<TablePaginationProps, "ref">,
  ref: ForwardedRef<HTMLDivElement | null>
): ReactElement | null {
  const { inputValue, handleChange } = useFilterQuery("page");
  const [cursor, setCursor] = useState(0);
  const STEP_LENGTH =
    totalPages < DEFAULT_STEP_LENGTH ? totalPages : DEFAULT_STEP_LENGTH;

  useLayoutEffect(() => {
    const page = parseInt(inputValue);
    if (page >= STEP_LENGTH) {
      setCursor(parseInt(inputValue) - STEP_LENGTH);
    }
  }, [STEP_LENGTH, inputValue]);

  const steps = useMemo(() => {
    return [
      ...Array.from(
        Array(cursor + STEP_LENGTH),
        (_, index) => index >= cursor && `${index + 1}`
      ),
    ].filter(Boolean) as string[];
  }, [STEP_LENGTH, cursor]);

  return (
    <ActionBar
      className="pagination"
      ref={ref as RefObject<HTMLDivElement>}
      rightContent={
        <Container
          disablePrevious={cursor > 0}
          disableNext={cursor + STEP_LENGTH < totalPages}
        >
          <Button
            variant="text"
            glyph="back-android"
            id="left-arrow"
            onClick={() => cursor > 0 && setCursor((prev) => (prev -= 1))}
          />

          <Pagination
            steps={steps}
            selectedStep={inputValue || "1"}
            onChangeStep={(value) => {
              handleChange(value);
            }}
            bar={false}
          />

          <Button
            variant="text"
            glyph="back-android"
            id="right-arrow"
            onClick={() =>
              cursor + STEP_LENGTH < totalPages &&
              setCursor((prev) => (prev += 1))
            }
          />
        </Container>
      }
    />
  );
}

const Container = styled("div")<{
  disablePrevious: boolean;
  disableNext: boolean;
}>`
  align-items: center;
  display: flex;
  gap: 0px 20px;
  justify-content: center;

  #right-arrow {
    transform: rotate(180deg);
    opacity: ${({ disableNext }) => (!disableNext ? 0.3 : 1)};
  }

  #left-arrow {
    opacity: ${({ disablePrevious }) => (!disablePrevious ? 0.3 : 1)};
  }
  #right-arrow,
  #left-arrow {
    svg * {
      fill: ${({ theme }) => "#A9A9A9"} !important;
    }
  }
  #pagination-component {
    gap: 0px 20px;
  }
`;

export const TablePagination = forwardRef(RefForwardingTablePagination);
