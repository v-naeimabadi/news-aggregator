import { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";
import { ViewProps } from "react-native";

export interface LoadingStatePropsWeb
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export interface LoadingStatePropsNative extends ViewProps {}

export type LoadingStateProps = LoadingStatePropsWeb | LoadingStatePropsNative;

export function LoadingState<
  PlatformProps extends LoadingStateProps = LoadingStateProps,
>(props: PlatformProps): ReactElement | null;
