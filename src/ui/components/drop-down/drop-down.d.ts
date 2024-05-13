import {
  DetailedHTMLProps,
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
  Ref,
} from "react";
import { Placement } from "@floating-ui/react";
import { DropDownDimension } from "./typings/dropdown-dimension";

export interface DropDownProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  content?: ReactNode | null;
  height?: DropDownDimension;
  width?: DropDownDimension;
  minWidth?: number | "element";
  minHeight?: number | "element";
  maxWidth?: number | "element";
  maxHeight?: number | "element";
  placement?: Placement;
  shiftX?: number;
  shiftY?: number;
  onOpen?: () => void;
  onClose?: () => void;
  open?: boolean;
  defaultOpen?: boolean;
  onRequestOpen?: (e: Event) => void;
  onRequestClose?: (e: Event & { source?: CloseSource }) => void;
  elementRef?: Ref<unknown>;
}

export const DropDown: FunctionComponent<DropDownProps>;
