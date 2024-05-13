import { ReactElement } from "react";
import { ActionBarProps } from "./typings/action-bar-props";

export function ActionBar<
  PlatformProps extends ActionBarProps = ActionBarProps,
>(props: PlatformProps): ReactElement | null;
