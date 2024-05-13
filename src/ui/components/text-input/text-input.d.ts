import { FieldPath, FieldValues } from "react-hook-form";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactElement,
  Ref,
} from "react";
import {
  StyleProp,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  ViewStyle,
} from "react-native";

export interface TextInputPropsBase<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  connect?: TFieldName | string;
  error?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  avoidKeyboard?: boolean;
  type?:
    | "number"
    | "decimal"
    | "text"
    | "name"
    | "username"
    | "email"
    | "phone-number"
    | "password"
    | "address1"
    | "business-name";
  onChangeText?: (value: string) => void;
  autofocus?: boolean;
  accessible?: string | boolean;
  disabled?: boolean;
  resize?: "vertical" | "horizontal" | true | false | null;
  containerStyle?: StyleProp<ViewStyle>;
  required?: boolean;
}

export interface TextInputPropsWeb<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends TextInputPropsBase<TFieldValues, TFieldName>,
    Omit<
      DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >,
      "ref"
    > {
  ref?: Ref<HTMLInputElement>;
}

export interface TextInputPropsNative<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends TextInputPropsBase<TFieldValues, TFieldName>,
    Omit<RNTextInputProps, "ref"> {
  ref?: Ref<RNTextInput>;
}

export type TextInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> =
  | TextInputPropsWeb<TFieldValues, TFieldName>
  | TextInputPropsNative<TFieldValues, TFieldName>;

export function TextInput<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  PlatformProps extends TextInputProps<
    TFieldValues,
    TFieldName
  > = TextInputProps<TFieldValues, TFieldName>,
>(props: PlatformProps): ReactElement | null;
