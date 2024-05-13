import { ReactElement } from "react";
import styled from "styled-components";
import { Glyph } from "../glyphs/glyph.web";
import { ErrorMessage } from "./components/error-message.web";
import { ErrorMessagesPropsWeb } from "./error-messages";

export function ErrorMessages({
  errors,
  ...props
}: ErrorMessagesPropsWeb): ReactElement | null {
  if (errors?.length) {
    return (
      <Container>
        <Glyph name="warning" color="#FF3232" size={16} />
        <ErrorContainer {...props}>
          {errors.map((error, i) => {
            return (
              <li style={{ marginBottom: -2 }} key={i}>
                {typeof error === "string" ? (
                  <ErrorMessage message={error} data-testid="errorMessage" />
                ) : (
                  error
                )}
              </li>
            );
          })}
        </ErrorContainer>
      </Container>
    );
  } else {
    return null;
  }
}

const ErrorContainer = styled("ul")`
  list-style: none;
  margin-left: -24px;
  margin-top: 10px !important;
`;

const Container = styled("div")`
  display: flex;
`;
