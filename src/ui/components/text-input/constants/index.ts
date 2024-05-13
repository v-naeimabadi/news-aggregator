import { TextInputPropsWeb, TextInputPropsNative } from "../text-input";

export interface TextInputTypePropsNative {
  autoCapitalize?: TextInputPropsNative["autoCapitalize"];
  autoCorrect?: TextInputPropsNative["autoCorrect"];
  keyboardType?: TextInputPropsNative["keyboardType"];
  spellCheck?: TextInputPropsNative["spellCheck"];
  maxLength?: TextInputPropsNative["maxLength"];
  autoComplete?: TextInputPropsNative["autoComplete"];
  selectTextOnFocus?: TextInputPropsNative["selectTextOnFocus"];
  secureTextEntry?: TextInputPropsNative["secureTextEntry"];
}

export interface TextInputTypePropsWeb {
  autoCapitalize?: TextInputPropsWeb["autoCapitalize"];
  autoCorrect?: TextInputPropsWeb["autoCorrect"];
  inputMode?: TextInputPropsWeb["inputMode"];
  spellCheck?: TextInputPropsWeb["spellCheck"];
  maxLength?: TextInputPropsWeb["maxLength"];
  autoComplete?: TextInputPropsWeb["autoComplete"];
  type?: "password" | "text" | "number";
}

export const NUMBER_PROPS_NATIVE: TextInputTypePropsNative = {
  autoCapitalize: "none",
  autoCorrect: false,
  keyboardType: "number-pad",
  spellCheck: false,
};
export const NUMBER_PROPS_WEB: TextInputTypePropsWeb = {
  autoCapitalize: "off",
  inputMode: "numeric",
  spellCheck: false,
  type: "number",
};
export const DECIMAL_PROPS_WEB: TextInputTypePropsWeb = {
  autoCapitalize: "off",
  inputMode: "decimal",
  spellCheck: false,
  type: "number",
};

export const NAME_PROPS_NATIVE: TextInputTypePropsNative = {
  autoCapitalize: "words",
  autoCorrect: false,
  keyboardType: "default",
  maxLength: 75,
  autoComplete: "name",
  spellCheck: false,
};
export const NAME_PROPS_WEB: TextInputTypePropsWeb = {
  autoCapitalize: "words",
  autoCorrect: "off",
  maxLength: 75,
  autoComplete: "name",
  spellCheck: false,
};

export const USERNAME_PROPS_NATIVE: TextInputTypePropsNative = {
  autoCapitalize: "none",
  autoCorrect: false,
  autoComplete: "username",
  keyboardType: "email-address",
  maxLength: 255,
  selectTextOnFocus: true,
  spellCheck: false,
};

export const USERNAME_PROPS_WEB: TextInputTypePropsWeb = {
  autoCapitalize: "none",
  autoCorrect: "off",
  autoComplete: "username",
  inputMode: "email",
  maxLength: 255,
  spellCheck: false,
};

export const EMAIL_PROPS_NATIVE: TextInputTypePropsNative = {
  autoCapitalize: "none",
  autoCorrect: false,
  autoComplete: "email",
  keyboardType: "email-address",
  maxLength: 255,
  selectTextOnFocus: true,
  spellCheck: false,
};
export const EMAIL_PROPS_WEB: TextInputTypePropsWeb = {
  autoCapitalize: "none",
  autoCorrect: "off",
  autoComplete: "email",
  inputMode: "email",
  maxLength: 255,
  spellCheck: false,
};

export const PHONE_NUMBER_PROPS_NATIVE: TextInputTypePropsNative = {
  autoCapitalize: "none",
  autoCorrect: false,
  autoComplete: "tel",
  keyboardType: "phone-pad",
  maxLength: 255,
  selectTextOnFocus: true,
  spellCheck: false,
};
export const PHONE_NUMBER_PROPS_WEB: TextInputTypePropsWeb = {
  autoCapitalize: "none",
  autoCorrect: "off",
  autoComplete: "tel",
  inputMode: "tel",
  maxLength: 255,
  spellCheck: false,
};

export const PASSWORD_PROPS_NATIVE: TextInputTypePropsNative = {
  autoCapitalize: "none",
  autoComplete: "password",
  autoCorrect: false,
  secureTextEntry: true,
  selectTextOnFocus: true,
  spellCheck: false,
};
export const PASSWORD_PROPS_WEB: TextInputTypePropsWeb = {
  autoCapitalize: "none",
  autoComplete: "password",
  autoCorrect: "off",
  type: "password",
  spellCheck: false,
};

export const ADDRESS1_PROPS_NATIVE: TextInputTypePropsNative = {
  autoCapitalize: "words",
  autoCorrect: false,
  autoComplete: "street-address",
  keyboardType: "default",
  spellCheck: false,
};
export const ADDRESS1_PROPS_WEB: TextInputTypePropsWeb = {
  autoCapitalize: "words",
  autoCorrect: "off",
  autoComplete: "street-address",
  spellCheck: false,
};

export const BUSINESS_NAME_PROPS_NATIVE: TextInputTypePropsNative = {
  autoCapitalize: "words",
  autoCorrect: false,
  keyboardType: "default",
  spellCheck: false,
};
export const BUSINESS_NAME_PROPS_WEB: TextInputTypePropsWeb = {
  autoCapitalize: "words",
  autoCorrect: "off",
  spellCheck: false,
};
