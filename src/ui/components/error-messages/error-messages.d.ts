import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";

export interface ErrorMessagesPropsBase {
  errors?: (string | ReactNode)[];
}

export interface ErrorMessagesPropsWeb
  extends ErrorMessagesPropsBase,
    Omit<
      DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>,
      "ref"
    > {}

export interface ErrorMessagesPropsNative extends ErrorMessagesPropsBase {}

export type ErrorMessagesProps =
  | ErrorMessagesPropsWeb;

export function ErrorMessages<
  PlatformProps extends ErrorMessagesProps = ErrorMessagesProps
>(props: PlatformProps): ReactElement | null;
