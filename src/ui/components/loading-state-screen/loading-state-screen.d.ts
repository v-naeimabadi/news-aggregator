import { ReactElement } from "react";
import { ScrollViewProps } from "react-native";

export interface LoadingStateScreenPropsWeb {}
export interface LoadingStateScreenPropsNative extends ScrollViewProps {}

export type LoadingStateScreenProps =
  | LoadingStateScreenPropsWeb
  | LoadingStateScreenPropsNative;

export function LoadingStateScreen<
  PlatformProps extends LoadingStateScreenProps = LoadingStateScreenProps,
>(props: PlatformProps): ReactElement | null;
