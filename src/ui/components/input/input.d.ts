import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from "react";
import { PressableProps } from "react-native";

interface InputPropsBase {
  error?: boolean;
  disabled?: boolean;
  selected?: boolean;
  placeholder?: string;
  value?: string | ReactNode;
  focused?: boolean;
  accessory?: "disclosure";
  label?: string | ReactNode;
}

export interface InputPropsWeb
  extends InputPropsBase,
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    > {}

export interface InputPropsNative
  extends InputPropsBase,
    PropsWithChildren<Omit<PressableProps, "children">> {}

export type InputProps = InputPropsWeb | InputPropsNative;

export function Input<PlatformProps extends InputProps = InputProps>(
  prop: PlatformProps,
): ReactElement | null;
