import { DetailedHTMLProps, LabelHTMLAttributes, ReactElement } from "react";
import { FieldPath, FieldValues } from "react-hook-form";
import { StyleProp, TextProps, ViewStyle } from "react-native";
import { CSSProperties } from "styled-components";

export interface LabelPropsBase<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  required?: boolean;
  color?: string;
  error?: boolean;
  connect?: TFieldName | string;
}

export interface LabelPropsWeb<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends LabelPropsBase<TFieldValues, TFieldName>,
    Omit<
      DetailedHTMLProps<
        LabelHTMLAttributes<HTMLLabelElement>,
        HTMLLabelElement
      >,
      "ref"
    > {
  containerStyle?: CSSProperties;
  ref?: RefObjectt<HTMLLabelElement> | null | undefined;
}

export interface LabelPropsNative<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends LabelPropsBase<TFieldValues, TFieldName>,
    TextProps {
  containerStyle?: StyleProp<ViewStyle>;
}

export type LabelProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> =
  | LabelPropsWeb<TFieldValues, TFieldName>
  | LabelPropsNative<TFieldValues, TFieldName>;

export function Label(props: LabelProps<never, never>): ReactElement | null;
