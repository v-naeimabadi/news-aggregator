import { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";

export interface HeaderBarTitleProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {}

export function HeaderBarTitle(props: HeaderBarTitleProps): ReactElement | null;
