import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";

export interface DropDownMenuProps
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>,
    "children"
  > {
  items: ReactNode[];
}

export function DropDownMenu(props: DropDownMenuProps): ReactElement | null;
