import { createContext, HTMLProps } from "react";

export const GetItemPropsContext = createContext<
  ((userProps?: HTMLProps<HTMLElement>) => Record<string, unknown>) | undefined
>(undefined);
