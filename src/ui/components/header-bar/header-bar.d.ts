import {
  ReactElement,
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
} from "react";

interface HeaderBarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title?: string | ReactNode;
  leftContent?: ReactNode;
  rigthContent?: ReactNode;
}

export function HeaderBar(props: HeaderBarProps): ReactElement | null;
