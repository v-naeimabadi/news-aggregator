export interface ErrorMessageProps
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>,
    "ref"
  > {
  name?: string;
  message?: string;
}

export declare const ErrorMessage: FunctionComponent<ErrorMessageProps>;
