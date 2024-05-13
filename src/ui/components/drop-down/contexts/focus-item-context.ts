import {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
} from "react";

export const FocusItemContext = createContext<
  | undefined
  | [MutableRefObject<number | null>, Dispatch<SetStateAction<null | number>>]
>(undefined);
