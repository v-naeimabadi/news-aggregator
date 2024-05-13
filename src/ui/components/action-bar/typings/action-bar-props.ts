import { DetailedHTMLProps, HTMLAttributes, ReactNode, RefObject } from "react";

export interface ActionBarPropsBase {
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  backgroundColor?: string;
}

export interface ActionBarPropsWeb
  extends ActionBarPropsBase,
    Omit<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
      "ref"
    > {
  ref?: RefObject<HTMLDivElement>;
}

export interface ActionBarPropsNative
  extends ActionBarPropsBase {
  ref?: RefObject<HTMLDivElement>;
}

export type ActionBarProps = ActionBarPropsWeb | ActionBarPropsNative;
